export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Grab your secure Anthropic key from Vercel's environment variables
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY on Vercel.' });
  }

  try {
    const { model, max_tokens, system, messages } = req.body;

    // 3. Make the request to Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: model || "claude-3-5-sonnet-20241022",
        max_tokens: max_tokens || 1000,
        system: system,
        messages: messages
      }),
    });

    const data = await response.json();

    // If Anthropic sent back an error, pass it through so we can see it
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error?.message || 'Anthropic API error' 
      });
    }
    
    // 4. Send the successful response back to your React app
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
