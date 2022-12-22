import express from "express";
import quarterController from "../controllers/quarterController";
import mw from "../middlewares/authentication";

const router = express.Router();

router.post('/create', mw.authentication, quarterController.create);
router.put('/update', mw.authentication, quarterController.update);

export default router;