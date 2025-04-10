// pages/api/jobs/[id].tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteReminder} from "@/controllers/affirmationandreminders.controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    const {id } = req.query;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Missing id" });       
    }
    if (req.method == 'DELETE') {
        try {
            return deleteReminder(id as string);
        } catch (error) {
            console.error("❌ Error deleting reminder:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    res.setHeader("Cache-Control", "no-store, max-age=0"); // 👈 Prevents caching
}