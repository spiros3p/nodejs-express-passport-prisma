import bcrypt from 'bcrypt';
import prisma from '../../prisma/prisma.config.js';
import { NextFunction, Request, Response } from 'express';
import { checkExistingEmail } from '../middleware/validation.middleware.js';
import {
    removePasswordFromMany,
    removePasswordFromSingle,
} from '../utils/util.js';

export async function createUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    const isAccepted = req.body.isAccepted;
    try {
        await checkExistingEmail(email);
        const hashedPassword = await bcrypt.hash(password, 12);
        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword,
            isAdmin: isAdmin,
            isAccepted: isAccepted,
        };
        const user = await prisma.user.create({ data: userDetails });
        // console.log(user);
        res.status(201).json({ message: 'User registered!' });
    } catch (err) {
        // @ts-ignore
        if (!err.statusCode) {
            // @ts-ignore
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function getUsers(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const allUsers = await prisma.user.findMany();
        // console.log(allUsers);
        res.status(200).json(removePasswordFromMany(allUsers));
    } catch (err) {
        // @ts-ignore
        if (!err.statusCode) {
            // @ts-ignore
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        // @ts-ignore
        const id = req.params.id;
        const result = await prisma.user.findFirst({
            where: { id: parseInt(id) },
        });
        // console.log(result);

        const user = removePasswordFromSingle(result);
        res.status(200).json(user);
    } catch (err) {
        // @ts-ignore
        if (!err.statusCode) {
            // @ts-ignore
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = req.params.id;
        const deleteResult = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        // console.log(deleteResult);
        if (deleteResult) {
            res.status(200).json({ message: 'User was succesfully deleted!' });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'User Not Found',
            });
        }
    } catch (err) {
        // @ts-ignore
        if (!err.statusCode) {
            // @ts-ignore
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function updateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = req.params.id || req.body.id;
        const data = {
            email: req.body.email,
            name: req.body.name,
            // password: req.body.password, // needs work
            isAdmin: req.body.isAdmin,
            isAccepted: req.body.isAccepted,
        };

        const result = await prisma.user.update({
            where: { id: parseInt(id) },
            data: data,
        });
        // console.log(result);
        if (result) {
            res.status(201).json({
                message: 'Updated successfully!',
                data: removePasswordFromSingle(result),
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'User Not Found.',
            });
        }
    } catch (err) {
        // @ts-ignore
        if (!err.statusCode) {
            // @ts-ignore
            err.statusCode = 500;
        }
        next(err);
    }
}
