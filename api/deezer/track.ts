import type { VercelRequest, VercelResponse } from '@vercel/node';

// Get track details by ID
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Missing track ID parameter' });
    }

    try {
        const response = await fetch(`https://api.deezer.com/track/${id}`);

        if (!response.ok) {
            throw new Error(`Deezer API error: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Deezer API proxy error:', error);
        return res.status(500).json({
            error: 'Failed to fetch track from Deezer API',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
