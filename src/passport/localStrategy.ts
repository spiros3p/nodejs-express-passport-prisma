import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import prisma from '../../prisma/prisma.config.js';

const authenticateUser = async (
    req: Request,
    email: string,
    password: string,
    done: any
) => {
    try {
        const user = await prisma?.user.findFirst({ where: { email: email } });

        if (!user) {
            const error = new Error('Wrong Credentials...');
            // @ts-ignore
            error.statusCode = 401;
            throw error;
        }
        const storedUser = user;
        const isEqual = await bcrypt.compare(password, storedUser.password);

        if (!isEqual) {
            const error = new Error('Wrong Credentials...');
            // @ts-ignore
            error.statusCode = 401;
            throw error;
        }
        // @ts-ignore
        delete user['password'];
        return done(null, user);
    } catch (err) {
        console.log('hereee');
        console.log(err);

        // @ts-ignore
        if (!err.statusCode) {
            console.log('hereee 111');
            // @ts-ignore
            err.statusCode = 500;
        }
        done(err);
    }
};

export const localStrategy = new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    authenticateUser
);
