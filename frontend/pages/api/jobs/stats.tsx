import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

import { getJobStats } from "@/controllers/jobs.controller";


export default async function handler( req: NextApiRequest, res: NextApiResponse){
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    if (req.method === "GET") {
        try {
            const jobStats = await getJobStats(userId);
            return res.status(200).json(jobStats);
        } catch (error) {
            console.error("Error fetching job stats:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }       
    }
    return res.status(405).json({ error: "Method Not Allowed" });
}