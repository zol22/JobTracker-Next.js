import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getAffirmation = async (userId: string) => {
    return await prisma.affirmation.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
     })
}

export const postAffirmation = async (userId: string, content: string) => {
    return await prisma.affirmation.create({
        data: {
            userId,
            content
        }
    })
}
export const deleteAffirmation = async (id: string) => {
    return await prisma.affirmation.delete({ where: { id } })
}
export const updateAffirmation = async (id: string, content: string) => {
    return await prisma.affirmation.update({
        where: { id },
        data: { content }
    })
}

export const getReminders = async (userId: string) => { 
    return await prisma.reminder.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    })
}

export const addReminder = async (userId: string, content: string) => { 
    return await prisma.reminder.create({
        data: {
            userId,
            content
        }
     })
}

export const deleteReminder = async (id: string) => {
    return await prisma.reminder.delete({ where: { id } })
}