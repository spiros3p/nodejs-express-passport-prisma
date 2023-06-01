import { NextFunction, Request, Response } from 'express';

export const setHeaderSettings = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // --------
    res.setHeader('Access-Control-Allow-Origin', '*');
    // --------
    /**
     * For CORS
     */
    // --------
    // const allowedOrigins = [process.env.FRONT_END_IP, 'http://localhost', 'http://localhost:4200', 'http://localhost:3306', 'http://0.0.0.0', 'http://0.0.0.0:4200', 'http://127.0.0.1', 'http://127.0.0.1:4200', 'http://127.0.0.1:3306'];
    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //   res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    // --------
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    // @ts-ignore
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, X-Custom-Header, Authorization, Access-Control-Allow-Headers, Origin, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
};
