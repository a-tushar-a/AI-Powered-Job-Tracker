import { PrismaClient } from '@prisma/client';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const createAnswer = async (answerData: any) => {
  const { userId, jobId, question, answer } = answerData;
  const newAnswer = await prisma.interviewAnswer.create({
    data: {
      userId,
      jobId,
      question,
      answer,
    },
  });
  return newAnswer;
};

export const getAnswersByUserId = async (userId: string) => {
    const answers = await prisma.interviewAnswer.findMany({
        where: { userId },
    });
    return answers;
};

export const getAnswerById = async (id: string) => {
    const answer = await prisma.interviewAnswer.findUnique({
        where: { id },
    });
    return answer;
};

export const updateAnswer = async (id: string, updateData: any) => {
    const answer = await prisma.interviewAnswer.update({
        where: { id },
        data: updateData,
    });
    return answer;
};

export const deleteAnswer = async (id: string) => {
    await prisma.interviewAnswer.delete({
        where: { id },
    });
};
