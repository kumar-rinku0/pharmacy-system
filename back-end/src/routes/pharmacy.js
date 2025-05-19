import { Router } from "express";
import multer from "multer";
import asyncWrap from "../utils/async-wrap.js";
import { handleUploadImage } from "../utils/cloud-init.js";

import {
  handleGetPharmacyByUserId,
  handleGetPharmacyByPharmacyId,
  handleCreatePharmacy,
  handleUpdatePharmacy,
  handleDeletePharmacy,
} from "../controllers/pharmacy.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.route("/getbyuserid/:userId").get(asyncWrap(handleGetPharmacyByUserId));

router
  .route("/getbypharmacyid/:pharmacyId")
  .get(asyncWrap(handleGetPharmacyByPharmacyId));

router
  .route("/update/pharmacyId/:pharmacyId")
  .put(
    upload.single("logo"),
    asyncWrap(handleUploadImage),
    asyncWrap(handleUpdatePharmacy)
  );

router
  .route("/delete/pharmacyId/:pharmacyId")
  .delete(asyncWrap(handleDeletePharmacy));

router
  .route("/create")
  .post(
    upload.single("logo"),
    asyncWrap(handleUploadImage),
    asyncWrap(handleCreatePharmacy)
  );

export default router;
