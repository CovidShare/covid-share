import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/AuthController.js';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', passport.authenticate('local', {session: false}), authController.login);
authRouter.get('/logout', passport.authenticate('jwt', {session: false}), authController.logout); // 'jwt' because you have to be logged in

authRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, privilege } = req.user;
    res.status(200).json({isAuthenticated: true, user : {username, privilege}});
});

export default authRouter;