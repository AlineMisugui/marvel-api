import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from "express-validator";

export const characterValidatorMiddleware = [
    body("name").isString().isLength({ min: 1, max: 100 }),
    body("description").isString().isLength({ min: 1, max: 500 }),
    body("image").isString().isLength({ min: 1, max: 300 }),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]