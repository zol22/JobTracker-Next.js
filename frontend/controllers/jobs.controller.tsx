// This is Client Component, deal with Database using Prisma
// These Functions are called from /pages/api/jobs/ ....
import type { NextApiRequest, NextApiResponse } from "next";
import { Job } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const findJob = async (id:string) => {
  return await prisma.job.findUnique({ where: { id } });
}
export const findJobwithComments = async (id:string) => {
  return await prisma.job.findUnique({ where: { id }, include: { comments: true } });
}
export const listJobs = async (userId:string ) => {
  return await prisma.job.findMany({
    where: { userId },
    include: {
      comments: true, // Include comments related to the job
    },
    orderBy: {
      createdAt: "desc", // optional: newest first
    },
  })
}

export const postAjob = async (data: {title: string, company: string, description:string, status: string, userId: string}) => {
  return await prisma.job.create({ data })  
  {/*try { 
        const { title, company, description, status } = req.body;
        if (!title || !company || !description) {
          return res.status(400).json({ error: 'Title, company, and description are required.' });
        }
        const newJob = {
          id: jobsList.length + 1,
          title,
          company,
          description,
          status: status || 'Applied',
          comments: [],
          history: [{ status: 'Applied', date: new Date().toISOString() }],
        };
        jobsList.push(newJob);
        return res.status(201).json(newJob);
    } catch(error) {
        console.error('Error creating job:', error);
        return res.status(500).json({ error: 'Internal Server Error' })
      }*/ }
}

export const addAComment = async (id:string, comment:string) => {
  return await prisma.comment.create({
    data: {
      content: comment,
      jobId: id
    }
  });
}

export const updateStatus = async (req: NextApiRequest, res:NextApiResponse) => {
    const { id } = req.query;
    const { status } = req.body;
   return await prisma.job.update({
      where: { id: id as string },
      data: { status }
    });

    /*const job = jobsList.find((job) => job.id === parseInt(id as string)); // converts the id from a string to an integer (a number).
    if (job) {
      job.status = status;
      job.history.push({ status, date: new Date().toISOString() });
      return res.json(job);
    } else {
      return res.status(404).send('Job not found');
    }*/
}

export const updateJob = async (req: NextApiRequest, res:NextApiResponse) => {
    const { id } = req.query;
    const updatedJob = req.body;
    const jobIndex = jobsList.findIndex((job) => job.id === parseInt(id as string));

    if (jobIndex !== -1) {
        jobsList[jobIndex] = { ...jobsList[jobIndex], ...updatedJob };
        return res.json(jobsList[jobIndex]);
    } else {
        return res.status(404).send('Job not found');
    }
}

export const deleteJob = async (req: NextApiRequest, res:NextApiResponse) => {
    const { id } = req.query;
    jobsList.filter((job) => job.id !== parseInt(id as string));
    return res.status(204).send('Job was successfully deleted');

}