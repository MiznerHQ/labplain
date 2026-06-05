export default async function handler(req, res) {
  // 1. Only allow POST requests (sending data to decode)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Grab your secure Anthropic key from Vercel's environment variables
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing Anthropic API Key on server.' });
  }

  try {
    // 3. Make the secure request to Anthropic from the server side
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify(req.body), // Pass along the prompt/data your frontend sent
    });

    const data = await response.json();
    
    // 4. Send the response back to your React app
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to communicate with Anthropic' });
  }
}
