import { Affirmation } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAffirmation() {
    try {
        const res = await fetch(`${API_URL}/api/affirmations`);
        const data = await res.json();
        console.log("✅ API Response:", data);
        return data || [];
        
    } catch (error) {
        console.error("❌ Error fetching affirmation:", error);
        return [];  
        
    }
}

export async function postAffirmation(affirmationData: Partial <Affirmation>) {
    try {
        const res = await fetch(`${API_URL}/api/affirmations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(affirmationData),
        });
        const data = await res.json();
        console.log("✅ API Response:", data);
        return data || [];
    } catch (error) {
        console.error("❌ Error Posting an affirmation:", error);
        return [];
    }
}
export async function deleteAffirmation(id: string) {
    try {
        const res = await fetch(`${API_URL}/api/affirmations/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log("✅ API Response:", data);
        return data || [];
    }
    catch (error) {
        console.error("❌ Error deleting affirmation:", error);
        return [];
    }
}
export async function updateAffirmation(id: string, content: string) {
    try {
        const res = await fetch(`${API_URL}/api/affirmations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });
        const data = await res.json();
        console.log("✅ API Response:", data);
        return data || [];
        
    } catch (error) {
        console.error("❌ Error updating affirmation:", error);
        return [];
        
    }
}

export async function getReminders() {
    try {
        const res = await fetch(`${API_URL}/api/reminders`);
        const data = await res.json();
        console.log("✅ API Response:", data);
        return data || [];
    } catch (error) {
        console.error("❌ Error fetching reminders:", error);
        return [];
        
    }
}

export async function postReminder(reminderData: Partial <Affirmation>) {
    try {
        const res = await fetch(`${API_URL}/api/reminders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reminderData),
        });
        const data = await res.json();
        console.log("✅ API Response:", data);
        return data || [];
        
    } catch (error) {
        console.error("❌ Error Posting a reminder:", error);
        return [];  
        
    }
}

export async function deleteReminder(id: string) {
    try {
         await fetch(`${API_URL}/api/reminders/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    
        
    } catch (error) {
        console.error("❌ Error deleting reminder:", error);
        return [];
        
    }
}