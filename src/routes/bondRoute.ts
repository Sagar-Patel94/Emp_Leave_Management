import express from "express";
import bondController from "../controllers/bondController";
import mw from "../middlewares/authentication";

const router = express.Router();

router.post("/create", mw.authentication, bondController.create);
router.get("/getBondDetails", bondController.getBondDetails);
router.put("/update", mw.authentication, bondController.update);
router.delete("/delete", mw.authentication, bondController.delete);

export default router;
