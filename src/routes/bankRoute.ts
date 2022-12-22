import express from "express";
import bankController from "../controllers/bankController";
import mw from "../middlewares/authentication";

const router = express.Router();

router.post("/create", mw.authentication, bankController.create);
router.get("/getData", bankController.getData);
router.put("/update", mw.authentication, bankController.update);
router.delete("/delete", mw.authentication, bankController.delete);

export default router;
