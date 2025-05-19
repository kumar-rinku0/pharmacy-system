import { Router } from "express";
import {
  handleCreateCustomerTransitionByCustomerId,
  handleCreateCustomerTransitionByEmailId,
  handleCreateCustomerTransitionByNewCustomer,
  handleGetCustomerTransitionByCustomerId,
  handleGetCustomerTransitionByEmailId,
  handleGetSearchResultByQuery
} from "../controllers/transition.js";
import asyncWrap from "../utils/async-wrap.js";

const router = Router();

router.post(
  "/createbycustomerid",
  asyncWrap(handleCreateCustomerTransitionByCustomerId)
);

router.post(
  "/createbyemail",
  asyncWrap(handleCreateCustomerTransitionByEmailId)
);

router.post(
  "/createbynewcustomer",
  asyncWrap(handleCreateCustomerTransitionByNewCustomer)
);

router.get(
  "/getbycusomerid",
  asyncWrap(handleGetCustomerTransitionByCustomerId)
);

router.get("/getbyemail", asyncWrap(handleGetCustomerTransitionByEmailId));
router.get("/getbysearch", asyncWrap(handleGetSearchResultByQuery));

export default router;
