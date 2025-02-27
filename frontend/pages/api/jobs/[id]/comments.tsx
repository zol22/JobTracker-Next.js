//pages/api/jobs/[id]/comments.tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { addAComment } from "@/controllers/jobs.controller";

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    if (req.method == 'POST') {
        return addAComment(req,res)
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}