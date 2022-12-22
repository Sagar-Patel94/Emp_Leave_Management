import express from "express";
import passwordController from "../controllers/passwordController";
import mw from "../middlewares/authentication";

const router = express.Router();

router.post("/changePassword", mw.authentication, passwordController.changePassword);
router.post("/otp", mw.authentication, passwordController.otp);
router.post("/reset", mw.authentication, passwordController.reset);

export default router;