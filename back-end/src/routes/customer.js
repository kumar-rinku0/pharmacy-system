// routes/formRoutes.ts
import { Router } from "express";
import {
  handleSubmitForm,
  handleGetAllForms,
  handleGetByEmailAddress,
} from "../controllers/customer.js";
import asyncWrap from "../utils/async-wrap.js";
const router = Router();

router.post("/submit", asyncWrap(handleSubmitForm));

router.get("/all", asyncWrap(handleGetAllForms));

// get by query
router.get("/getbyemail", asyncWrap(handleGetByEmailAddress));

export default router;
