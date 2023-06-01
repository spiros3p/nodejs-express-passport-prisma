import { NextFunction, Request, Response } from 'express';
import prisma from '../../prisma/prisma.config.js';
import Joi from 'joi';

const schemaUserSignUp = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    password: Joi.string().min(5),
});

export const validationUserSignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let validity = undefined;
    try {
        validity = await schemaUserSignUp.validateAsync(req.body);
        if (validity.error) {
            const errorMessage = validity.error.details[0].message;
            return res.status(400).json({ error: errorMessage });
        }
        next();
    } catch (e) {
        // @ts-ignore
        const message = e.message.split(' (')[0];
        return res.status(400).json({ error: message });
    }
};

export const checkExistingEmail = async (email: string) => {
    const user = await prisma.user.findFirst({ where: { email: email } });
    // console.log(user);
    if (user) {
        throw new Error('Email address already exists!');
    }
};
