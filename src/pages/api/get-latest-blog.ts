import { NextApiRequest, NextApiResponse } from "next";
import getBlogIndex from "../../lib/notion/getBlogIndex";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const postsTable = await getBlogIndex();

	if (!postsTable) {
		return res.status(401).json({ message: "Failed to fetch posts" });
	}

	const latestPost: any = Object.values(postsTable).sort((a: any, b: any) => {
		return new Date(b.Date).getTime() - new Date(a.Date).getTime();
	})[0];

	res.status(200).json(latestPost);
};
