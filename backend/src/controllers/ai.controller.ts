import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../db';
import genAI from '../gemini';

export const analyzeResume = async (req: AuthRequest, res: Response) => {
    try {
        const { resume, jobDescription } = req.body;
        const { jobId } = req.params;

        if (!resume || !jobDescription) {
            return res.status(400).json({ message: "Resume and job description are required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Analyze the following resume against the job description and provide a match score from 0 to 1, a list of missing skills, and suggestions for improvement.
        Resume: ${resume}
        Job Description: ${jobDescription}
        
        Provide the output in a JSON format with the following keys: match_score, missing_skills, suggestions.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        const analysis = JSON.parse(text);

        const savedAnalysis = await prisma.aIAnalysis.create({
            data: {
                jobId: parseInt(jobId),
                atsScore: analysis.match_score,
                missingSkills: analysis.missing_skills,
                suggestions: analysis.suggestions,
            },
        });

        res.status(200).json(savedAnalysis);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const generateQuestions = async (req: AuthRequest, res: Response) => {
    try {
        const { jobRole } = req.body;

        if (!jobRole) {
            return res.status(400).json({ message: "Job role is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Generate a list of 10 interview questions for a ${jobRole} position. Provide the output as a JSON array of strings.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        const questions = JSON.parse(text);

        res.status(200).json(questions);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};