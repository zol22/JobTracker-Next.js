// This is Client Component
import type { NextApiRequest, NextApiResponse } from "next";
import { Job } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const jobsList : Job[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Facebook',
      description: 'Work with React.js',
      status: 'Applied',
      comments: ['Applied on January 10, 2025'],
      history: [{ status: 'Applied', date: '2025-01-10' }],
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Github',
      description: 'Work with Node.js and Express',
      status: 'Resume Downloaded',
      comments: ['Resume downloaded by recruiter on January 12, 2025'],
      history: [
        { status: 'Applied', date: '2025-01-08' },
        { status: 'Resume Downloaded', date: '2025-01-12' },
      ],
    },
    {
        id: 3,
        title: 'Full Stack Developer',
        company: 'Deloitte',
        description: 'Work with React, Express &  SQL',
        status: 'Interview Scheduled',
        comments: ['Interview Scheduled on January 22, 2025'],
        history: [
          { status: 'Applied', date: '2025-01-08' },
          { status: 'Interview Scheduled', date: '2025-01-22' },
        ],
    },
    {
        id: 4,
        title: 'Backend Developer',
        company: 'Youtube',
        description: 'Work with Node.js and Express',
        status: 'Resume Downloaded',
        comments: ['Resume downloaded by recruiter on January 12, 2025'],
        history: [
          { status: 'Applied', date: '2025-01-08' },
          { status: 'Resume Downloaded', date: '2025-01-12' },
        ],
    },
    {
        id: 5,
        title: 'Backend Developer',
        company: 'Amazon',
        description: 'Work with Node.js and Express',
        status: 'Resume Downloaded',
        comments: ['Resume downloaded by recruiter on January 12, 2025'],
        history: [
          { status: 'Applied', date: '2025-01-08' },
          { status: 'Resume Downloaded', date: '2025-01-12' },
        ],
    },
  ];

export const listJobs = async (userId:string ) => {
  return await prisma.job.findMany({
    where: { userId}
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

export const addAComment = async (req: NextApiRequest, res:NextApiResponse) => {
    const { id } = req.query;
    const { comment } = req.body;
    const job = jobsList.find((job) => job.id === parseInt(id as string)); // we need to handle the fact that the id in the URL is a string, not a number. The id coming from the request URL is a string (because everything in the URL is a string).
    if (job) {
        // Initialize comments if it's undefined
        if (!job.comments) {
        job.comments = [];
        }
      job.comments.push(comment);
      return res.json(job);
    } else {
      return res.status(404).send('Job not found');
    }

}

export const updateStatus = async (req: NextApiRequest, res:NextApiResponse) => {
    const { id } = req.query;
    const { status } = req.body;
    const job = jobsList.find((job) => job.id === parseInt(id as string)); // converts the id from a string to an integer (a number).
    if (job) {
      job.status = status;
      job.history.push({ status, date: new Date().toISOString() });
      return res.json(job);
    } else {
      return res.status(404).send('Job not found');
    }
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