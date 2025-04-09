// This is Server, Routes
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { listJobs, postAjob } from "@/controllers/jobs.controller";
// pages/api/jobs.tsx



export default async function handler(req : NextApiRequest, res: NextApiResponse) {
  
  const { userId } = getAuth(req); // ✅ Only available on the server
  console.log( `This is userId from /pages/api/jobs ${userId}`)
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === 'GET') {
    res.setHeader("Cache-Control", "no-store, max-age=0"); // 👈 Prevents caching
    const jobs = await listJobs(userId);
    return res.status(200).json(jobs)

  } else if (req.method === 'POST') {
    const { title, company, description, status } = req.body;
    const newJob = await postAjob({title, company, description, status, userId}); // Create a new job
    return res.status(201).json(newJob)
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
