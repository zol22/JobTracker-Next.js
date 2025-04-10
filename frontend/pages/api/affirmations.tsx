// This file is responsible for handling the API requests related to affirmations.
// From here, UserId is obtained from the request using Clerk's authentication.

import type { NextApiRequest, NextApiResponse } from "next";
import { getAffirmation, postAffirmation} from "@/controllers/affirmationandreminders.controller"
import { getAuth } from "@clerk/nextjs/server";


export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req); // ✅ Only available on the server

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    
    if (req.method === 'GET') {
        res.setHeader("Cache-Control", "no-store, max-age=0"); // 👈 Prevents caching
        const affirmations = await getAffirmation( userId); // Get the affirmation
        return res.status(200).json(affirmations)
    }
    else if (req.method === 'POST') {
        const { content } = req.body;
        const newAffirmation = await postAffirmation(userId, content); // Create a new affirmation
        return res.status(201).json(newAffirmation)
    }
    else {  
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}

