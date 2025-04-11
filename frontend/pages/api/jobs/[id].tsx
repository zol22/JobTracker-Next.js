// pages/api/jobs/[id].tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteJob, findJob } from "@/controllers/jobs.controller";


export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
  
    const {id } = req.query;
        if (!id || typeof id !== "string") {
          return res.status(400).json({ error: "Missing id" });
        }

    if (req.method == 'PUT'){
      console.log("Update Job Request Body");
      

    } else if (req.method == 'DELETE') {
         try {
          // Ensure the job exists before deleting
          const job = await findJob(id as string);
          if (!job) {
            return res.status(404).json({ message: "Job not found" });
          }
          return deleteJob(id as string);

         } catch {
          return res.status(500).json({ message: "Failed to delete job" });
          
         }

    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}