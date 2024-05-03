import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const creatorValidatorMiddleware = [
    body("name").isString().isLength({ min: 1, max: 100 }),
    body("role").isString().isLength({ min: 1, max: 100 }),
    body("comics").isArray().isLength({ min: 1, max: 100 }),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]
