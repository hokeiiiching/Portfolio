import type { VercelRequest, VercelResponse } from '@vercel/node';

// Deezer API Proxy - bypasses CORS for frontend
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { q, type = 'track', limit = '25' } = req.query;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Missing search query parameter "q"' });
    }

    try {
        const searchType = ['track', 'artist', 'album'].includes(type as string) ? type : 'track';
        const searchLimit = Math.min(parseInt(limit as string) || 25, 50);

        const deezerUrl = `https://api.deezer.com/search/${searchType}?q=${encodeURIComponent(q)}&limit=${searchLimit}`;

        const response = await fetch(deezerUrl);

        if (!response.ok) {
            throw new Error(`Deezer API error: ${response.status}`);
        }

        const data = await response.json();

        // Return the data with preview URLs intact
        return res.status(200).json(data);
    } catch (error) {
        console.error('Deezer API proxy error:', error);
        return res.status(500).json({
            error: 'Failed to fetch from Deezer API',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
