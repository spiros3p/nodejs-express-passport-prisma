import { User } from '@prisma/client';
import { localStrategy } from './localStrategy.js';
import { PassportStatic } from 'passport';

export function initializePassport(passport: PassportStatic) {
    passport.use(localStrategy);

    passport.serializeUser(function (user, done) {
        console.log('user in');
        console.log(user);
        done(null, user);
    });

    passport.deserializeUser(async function (
        user: Omit<User, 'password'>,
        done
    ) {
        /** attaches user obj to req.user */
        done(null, user);
    });
}
