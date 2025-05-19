import { Router } from "express";
import {
  handleCreateMedication,
  handleGetAllMedications,
  handleGetMedicationById,
  handleUpdateMedication,
  handleDeleteMedication,
} from "../controllers/medication.js";
import asyncWrap from "../utils/async-wrap.js";

const router = Router();

router.post("/create", asyncWrap(handleCreateMedication));
router.get("/getAll", asyncWrap(handleGetAllMedications));
router.get("/:id", asyncWrap(handleGetMedicationById));
router.put("/:id", asyncWrap(handleUpdateMedication));
router.delete("/:id", asyncWrap(handleDeleteMedication));

export default router;
