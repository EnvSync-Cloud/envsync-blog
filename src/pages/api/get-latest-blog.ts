import { NextApiRequest, NextApiResponse } from "next";
import getBlogIndex from "../../lib/notion/getBlogIndex";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Set CORS headers to allow all origins
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	// Handle preflight requests
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}

	const postsTable = await getBlogIndex();

	if (!postsTable) {
		return res.status(401).json({ message: "Failed to fetch posts" });
	}

	const latestPost: any = Object.values(postsTable).sort((a: any, b: any) => {
		return new Date(b.Date).getTime() - new Date(a.Date).getTime();
	})[0];

	res.status(200).json(latestPost);
};
