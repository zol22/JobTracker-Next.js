import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { getReminders, addReminder } from "@/controllers/affirmationandreminders.controller";
import { Reminder } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req); // ✅ Only available on the server
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (req.method === 'GET') {
        res.setHeader("Cache-Control", "no-store, max-age=0"); // 👈 Prevents caching
        const reminders = await getReminders(userId); // Get the reminders
        return res.status(200).json(reminders);
    }
    else if (req.method === 'POST') {
        const { content } = req.body as Reminder;
        const newReminder = await addReminder(userId, content); // Create a new reminder
        return res.status(201).json(newReminder);
    }
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    // res.status(200).json({ name: 'John Doe' })
}