import { NextFunction, Request, Response } from 'express';
import { removePasswordFromSingle } from '../utils/util.js';

export function logout(req: Request, res: Response, next: NextFunction) {
    try {
        // @ts-ignore
        req.logout();
        res.clearCookie('connect.sid'); // clean up!
        res.status(200).json({ message: 'Succsesfully logged out...' });
    } catch (err) {
        // @ts-ignore
        if (!err.statusCode) {
            // @ts-ignore
            err.statusCode = 500;
        }
        next(err);
    }
}

export function okRespone(req: Request, res: Response) {
    res.status(200).json({ statusCode: 200 });
}

export function loginResponse(req: Request, res: Response) {
    // @ts-ignore
    const user = removePasswordFromSingle(req.user);
    res.status(200).json({ user: user });
}
