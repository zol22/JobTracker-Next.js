// pages/api/jobs/[id].tsx
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteAffirmation, updateAffirmation} from "@/controllers/affirmationandreminders.controller";


export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
  
    const { id } = req.query;
        if (!id || typeof id !== "string") {
          return res.status(400).json({ error: "Missing id" });
        }

    if (req.method == 'PUT'){
        console.log("Update Job Request Body");
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }
        try {
            const updatedAffirmation = await updateAffirmation(id as string, content);
            return res.status(200).json(updatedAffirmation);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update affirmation" });
        }
      

    } else if (req.method == 'DELETE') {
            try {
            // Ensure the affirmation exists before deleting
            const affirmation = await deleteAffirmation(id as string);
            if (!affirmation) {
                return res.status(404).json({ error: "Affirmation not found" });
            }
            return res.status(200).json({ message: "Affirmation deleted successfully" });
    
            } catch (error) {
                return res.status(500).json({ error: "Failed to delete affirmation" });
            }

    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}