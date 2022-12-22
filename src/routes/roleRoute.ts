import express from "express";
import roleController from "../controllers/roleController";
import mw from "../middlewares/authentication";

const router = express.Router();

router.post('/create', roleController.create);
router.get('/get', roleController.get);

export default router;