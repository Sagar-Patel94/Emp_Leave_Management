import express from "express";
import upload from "../middlewares/fileUploadMiddleware";
import mw from "../middlewares/authentication";
import fileUploadController from "../controllers/fileUploadController";

const router = express.Router();

router.post('/upload', mw.authentication, upload, fileUploadController.upload);

export default router;