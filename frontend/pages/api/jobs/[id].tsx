// pages/api/jobs/[id].tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteJob, updateJob } from "@/controllers/jobs.controller";


export default function handler(req: NextApiRequest, res: NextApiResponse ) {
  if (req.method == 'PUT'){
    return updateJob(req,res)
  } else if (req.method == 'DELETE') {
    return deleteJob(req,res)
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}