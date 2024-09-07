import { Router } from "express";
import { calculateEmi, getEmis, getEmiById } from "./controller";

const router = Router();

router.post("/calculate-emi", calculateEmi);
router.get("/emis", getEmis);
router.get("/emi/:id", getEmiById);

export default router;
