import express from "express";
import salaryController from "../controllers/salaryController";
import mw from "../middlewares/authentication";

const router = express.Router();

router.post("/create", mw.authentication, salaryController.create);
router.get("/getData", salaryController.getData);
router.put("/update", mw.authentication, salaryController.update);
router.delete("/delete", mw.authentication, salaryController.delete);

export default router;