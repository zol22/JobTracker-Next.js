import type { NextApiRequest, NextApiResponse } from "next";
import { listJobs, postAjob } from "@/controllers/jobs.controller";
// pages/api/jobs.tsx



export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.setHeader("Cache-Control", "no-store, max-age=0"); // 👈 Prevents caching
    return listJobs(req,res);
  } else if (req.method === 'POST') {
    // Create a new job
    return postAjob(req,res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
