import { Router } from 'express';
import {
    checkAuthenticated,
    checkAdmin,
} from '../middleware/authentication.middleware.js';
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser,
} from '../controllers/user.controller.js';
import { validationUserSignUp } from '../middleware/validation.middleware.js';

const router = Router();

router.post(
    '',
    // checkAuthenticated,
    // checkAdmin,
    validationUserSignUp,
    createUser
);
router.get(
    '',
    // checkAuthenticated, checkAdmin,
    getUsers
);
router.get(
    '/:id',
    // checkAuthenticated, checkAdmin,
    getUser
);
router.patch(
    '/:id',
    //  checkAuthenticated, checkAdmin,
    updateUser
);
router.delete(
    '/:id',
    //  checkAuthenticated, checkAdmin,
    deleteUser
);

/** Alternative */
// router
//     .route('/user/:id')
//     .get(checkAuthenticated, checkAdmin, fetchUser)
//     .patch(checkAuthenticated, checkAdmin, updateUser);

export default router;
