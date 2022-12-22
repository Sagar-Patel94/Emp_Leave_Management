import express from "express";
import leaveController from "../controllers/leaveController";
import mw from "../middlewares/authentication";

const router = express.Router();

router.post('/status', mw.authentication, leaveController.status);
router.post('/create1', leaveController.create1);
router.post('/create', leaveController.create);
router.get('/getLeave', leaveController.getLeave);
router.put('/update', mw.authentication, leaveController.update);
router.delete('/delete', mw.authentication, leaveController.delete);

export default router;