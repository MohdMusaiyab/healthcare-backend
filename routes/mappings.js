import express from "express";
import { body } from "express-validator";
import { authenticateToken } from "../middleware/auth.js";
import {
  assignDoctorToPatient,
  getAllPatientDoctorAssignments,
  getPatientDoctors,
  removeDoctorFromPatient,
} from "../controllers/patientDoctorController.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  [
    body("patientId")
      .isInt({ min: 1 })
      .withMessage("Valid patient ID required"),
    body("doctorId").isInt({ min: 1 }).withMessage("Valid doctor ID required"),
  ],
  assignDoctorToPatient
);

router.get("/", authenticateToken, getAllPatientDoctorAssignments);
router.get("/:patientId", authenticateToken, getPatientDoctors);
router.delete("/:id", authenticateToken, removeDoctorFromPatient);

export default router;
