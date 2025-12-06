import type { VercelRequest, VercelResponse } from '@vercel/node';

// Get chart/trending tracks
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { limit = '25' } = req.query;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const chartLimit = Math.min(parseInt(limit as string) || 25, 100);
        const response = await fetch(`https://api.deezer.com/chart/0/tracks?limit=${chartLimit}`);

        if (!response.ok) {
            throw new Error(`Deezer API error: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Deezer API proxy error:', error);
        return res.status(500).json({
            error: 'Failed to fetch charts from Deezer API',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
