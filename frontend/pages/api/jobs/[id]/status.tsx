//pages/api/jobs/[id]/status.tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { updateStatus } from "@/controllers/jobs.controller";

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    if (req.method == 'PUT') {
        return updateStatus(req,res)
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}