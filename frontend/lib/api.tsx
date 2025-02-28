// lib/api.ts
import { Job } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getJobs() {
  try {
    const res = await fetch(`${API_URL}/api/jobs`);
    if (!res.ok) {
      console.error("❌ API request failed:", res.status, res.statusText);
      return [];
   }
  const data = await res.json();
  console.log("✅ API Response:", data); // 🚀 Debug the response
  return data.jobsList || [];
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    return [];
  }
 

}

export async function postJob(jobData: Partial <Job>) {
  const res = await fetch(`${API_URL}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });
  return await res.json();
}

export async function deleteJob(id: number) {
    fetch(`${API_URL}/api/jobs/${id}`, { method: 'DELETE' });
}

export async function updateStatus(id: number, status: string){
    const res = await fetch(`${API_URL}/api/jobs/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return await res.json();
}

export async function addComment(id: number, comment: string) {
    const res = await fetch(`${API_URL}/api/jobs/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });
      return await res.json();
}