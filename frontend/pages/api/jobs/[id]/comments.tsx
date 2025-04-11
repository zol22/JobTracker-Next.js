//pages/api/jobs/[id]/comments.tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { addAComment, findJob, findJobwithComments } from "@/controllers/jobs.controller";

export default async function handler(req: NextApiRequest,res: NextApiResponse){

    const { id } = req.query;
    const { content } = req.body;

    if (!id || typeof id!== "string") {
        return res.status(400).json({ error: "Missing id" });
    }

    if (req.method == 'POST') {
        try {
            // Ensure the job exists before adding a comment
            const job = await findJob(id as string);
            if (!job) {
                return res.status(404).json({ error: "Job not found" });
            }
            // Create a new comment
            const jobWithAnewComment =  await addAComment(id as string, content as string)
            return res.status(201).json(jobWithAnewComment);
        
        } catch {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        
    } else if (req.method == 'GET') {

        try {
            // Return the job with the new comment
            const jobWithAnewComment = await findJobwithComments(id as string);
            if (!jobWithAnewComment) return res.status(404).json({ error: "Job not found" });
            return res.status(200).json(jobWithAnewComment.comments || []);
        } catch  {
            return res.status(500).json({ message: "Internal Server Error" });
        }
     
    }   
    return res.setHeader("Allow", ["POST"]).status(405).json({ error: `Method ${req.method} Not Allowed` });
}