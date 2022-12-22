import express from "express";
import attendenceController from "../controllers/attendenceController";

const router = express.Router();

router.post('/create', attendenceController.create);
router.get('/getAttendence', attendenceController.getAttendence);

export default router;