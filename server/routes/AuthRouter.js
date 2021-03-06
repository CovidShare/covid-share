import express from "express";
import passport from "passport";
import * as authController from "../controllers/AuthController.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", passport.authenticate("local", { session: false }), authController.login);
authRouter.get("/logout", passport.authenticate("jwt", { session: false }), authController.logout); // 'jwt' because you have to be logged in

authRouter.get("/authenticated",passport.authenticate("jwt", { session: false }), authController.authenticated);

authRouter.get('/user/p/:username', passport.authenticate('jwt',{session : false}), authController.getUser);
authRouter.post('/user/update', passport.authenticate('jwt',{session : false}), authController.userUpdate);
authRouter.get('/admin',passport.authenticate('jwt',{session : false}), authController.admin);
authRouter.post('/admin/update', passport.authenticate('jwt',{session : false}), authController.adminUpdateUser);

export default authRouter;
