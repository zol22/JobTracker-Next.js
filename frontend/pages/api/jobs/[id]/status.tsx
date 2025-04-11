//pages/api/jobs/[id]/status.tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { updateStatus } from "@/controllers/jobs.controller";

export default async function handler(req: NextApiRequest,res: NextApiResponse){
    const { id } = req.query;
    const { status } = req.body;
    if (req.method == 'PUT') {
        const newStatus =  updateStatus(id as string,status as string);
        return res.status(200).json(newStatus);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}