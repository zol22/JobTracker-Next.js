// This is Client Component, deal with Database using Prisma
// These Functions are called from /pages/api/jobs/ ....
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
}

export const addAComment = async (id:string, comment:string) => {
  return await prisma.comment.create({
    data: {
      content: comment,
      jobId: id
    }
  });
}

export const updateStatus = async (id: string, status:string) => {
   return await prisma.job.update({
      where: { id },
      data: { status },
      include: {
        comments: true, // Include comments in the response
      }
    });
}

export const deleteJob = async (id : string) => {
    return await prisma.job.delete({ where: { id } });

}

export const getJobStats = async (userId:string) => {
  return await prisma.job.findMany({
    where: { userId },
    select: {
      status: true,
      createdAt: true
    }
  });
}