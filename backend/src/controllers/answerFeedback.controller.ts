import { Request, Response, NextFunction } from 'express';
import * as answerService from '../services/answerFeedback.service';
import { AppError } from '../utils/AppError';

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const createAnswer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }
    const answer = await answerService.createAnswer({ ...req.body, userId });
    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
};

export const getAnswers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
          throw new AppError('User not authenticated', 401);
        }
        const answers = await answerService.getAnswersByUserId(userId);
        res.status(200).json(answers);
    } catch (error) {
        next(error);
    }
};

export const getAnswerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const answer = await answerService.getAnswerById(id);
        if (!answer) {
            return next(new AppError('Answer not found', 404));
        }
        res.status(200).json(answer);
    } catch (error) {
        next(error);
    }
};

export const updateAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const answer = await answerService.updateAnswer(id, req.body);
        if (!answer) {
            return next(new AppError('Answer not found', 404));
        }
        res.status(200).json(answer);
    } catch (error) {
        next(error);
    }
};

export const deleteAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await answerService.deleteAnswer(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
