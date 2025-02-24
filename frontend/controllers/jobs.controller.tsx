import type { NextApiRequest, NextApiResponse } from "next";
import { Job } from "@/types";
let jobs : Job[] = [
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

export const listJobs = async (req: NextApiRequest, res:NextApiResponse) => {
    try {
        if (!jobs) {
          return res.status(404).json({ message: 'Jobs not Found', error: 'Not Found: The requested resource does not exist.'})
        }
        res.status(200).json({message:'Jobs are listed successfully', jobs}) // Sends back the newly created job  as a JSON response.
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      }
}

export const postAjob = async (req: NextApiRequest, res:NextApiResponse) => {
    try { 
        const { title, company, description, status } = req.body;
        if (!title || !company || !description) {
          return res.status(400).json({ error: 'Title, company, and description are required.' });
        }
        const newJob = {
          id: jobs.length + 1,
          title,
          company,
          description,
          status: status || 'Applied',
          comments: [],
          history: [{ status: 'Applied', date: new Date().toISOString() }],
        };
        jobs.push(newJob);
        return res.status(201).json(newJob);
    } catch(error) {
        console.error('Error creating job:', error);
        return res.status(500).json({ error: 'Internal Server Error' })
      }
}

export const addAComment = async (req: NextApiRequest, res:NextApiResponse) => {
    const { id } = req.query;
    const { comment } = req.body;
    const job = jobs.find((job) => job.id === parseInt(id as string)); // we need to handle the fact that the id in the URL is a string, not a number. The id coming from the request URL is a string (because everything in the URL is a string).
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
    const job = jobs.find((job) => job.id === parseInt(id as string)); // converts the id from a string to an integer (a number).
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
    const jobIndex = jobs.findIndex((job) => job.id === parseInt(id as string));

    if (jobIndex !== -1) {
        jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob };
        return res.json(jobs[jobIndex]);
    } else {
        return res.status(404).send('Job not found');
    }
}

export const deleteJob = async (req: NextApiRequest, res:NextApiResponse) => {
    const { id } = req.query;
    jobs = jobs.filter((job) => job.id !== parseInt(id as string));
    return res.status(204).send('Job was successfully deleted');

}