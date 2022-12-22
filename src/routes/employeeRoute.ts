import express from "express";
import employeeController from "../controllers/employeeController";
import mw from "../middlewares/authentication";

const router = express.Router();

router.get("/allEmpDetails", employeeController.allEmpDetails);
router.get("/getAllEmp", employeeController.getAllEmp);
router.post("/signIn", employeeController.signIn);
router.post("/signUp", /*mw.authentication,*/ employeeController.signUp);
router.get("/getById", employeeController.getById);
router.put("/update", mw.authentication, employeeController.update);
router.delete("/delete", mw.authentication, employeeController.delete);
router.get("/restore", /*mw.authentication,*/ employeeController.restore);

export default router;
