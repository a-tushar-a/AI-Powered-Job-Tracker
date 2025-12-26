import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../db';

export const getJobs = async (req: AuthRequest, res: Response) => {
    try {
        const jobs = await prisma.job.findMany({
            where: { userId: req.userId },
        });
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createJob = async (req: AuthRequest, res: Response) => {
    try {
        const { company, role, status, applied_date, notes } = req.body;
        const job = await prisma.job.create({
            data: {
                company,
                role,
                status,
                appliedDate: new Date(applied_date),
                notes,
                userId: req.userId!,
            },
        });
        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateJob = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { company, role, status, applied_date, notes } = req.body;
        const job = await prisma.job.update({
            where: { id: parseInt(id) },
            data: {
                company,
                role,
                status,
                appliedDate: new Date(applied_date),
                notes,
            },
        });
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.job.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};