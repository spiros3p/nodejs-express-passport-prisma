import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma.config.js';

export function checkAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ statusCode: 401, message: 'Not authenticated!' });
}

export function checkNotAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.isAuthenticated()) {
        res.status(400).json({
            statusCode: 400,
            message: 'Already authenticated!',
        });
        return;
    }
    next();
}

export async function checkAdmin(
    req: Request | any,
    res: Response,
    next: NextFunction
) {
    try {
        const id = req.user.id;
        // @ts-ignore
        const user = await prisma.user.findUnique({ where: { id: id } });
        if (!user?.isAccepted) {
            res.status(403).json({
                statusCode: 403,
                message: 'No Admin status found...',
            });
            return;
        }
        next();
    } catch (err) {
        // @ts-ignore
        if (!err.statusCode) {
            // @ts-ignore
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function checkIsAccepted(
    req: Request | any,
    res: Response,
    next: NextFunction
) {
    try {
        const email: string = req.user.email;
        // @ts-ignore
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user?.isAccepted) {
            req.logout();
            res.status(403).json({
                statusCode: 403,
                message: 'Not accepted yet',
            });
            return;
        }
        next();
    } catch (err) {
        // @ts-ignore
        if (!err.statusCode) {
            // @ts-ignore
            err.statusCode = 500;
        }
        next(err);
    }
}
