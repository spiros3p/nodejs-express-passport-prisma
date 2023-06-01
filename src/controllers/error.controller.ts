import { NextFunction, Request, Response } from 'express';

export function get404(req: Request, res: Response, next: NextFunction) {
    const error = new Error('Not found.');
    console.log('hereee2222');

    // @ts-ignore
    error.statusCode = 404;
    next(error);
}

export function get500(error: Error, req: Request, res: Response) {
    console.log('hereee3333');
    // @ts-ignore
    const data = error.data;
    // @ts-ignore
    res.status(error.statusCode || 500);
    res.json({
        error: {
            message: error.message,
            data: data,
        },
    });
}
