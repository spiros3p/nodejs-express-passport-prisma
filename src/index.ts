import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { initializePassport } from './passport/passport.config.js';
import { get404, get500 } from './controllers/error.controller.js';
import { setHeaderSettings } from './config/header.config.js';
import authRoutes from './routes/authentication.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

// PASSPORT
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// HEADER Configuration
app.use(setHeaderSettings);

// ////////////// ROUTES //////////////////// //
// non-user

// Admin
app.use('/admin/auth', authRoutes);
app.use('/admin/user', userRoutes);
// ////////////// ROUTES - END ////////////// //

// //// ERRORS //// //
app.use(get404);
app.use(get500);

// //// START Server //// //
const PORT = process.env.PORT_BE || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
