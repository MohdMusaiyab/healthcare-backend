import express from "express";
import { body } from "express-validator";
import { authenticateToken } from "../middleware/auth.js";
import {
  createPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

const patientValidation = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("phone").trim().notEmpty().withMessage("Phone number required"),
  body("dateOfBirth").isISO8601().withMessage("Valid date of birth required"),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),
];

router.post("/", authenticateToken, patientValidation, createPatient);
router.get("/", authenticateToken, getAllPatients);
router.get("/:id", authenticateToken, getPatient);
router.put("/:id", authenticateToken, patientValidation, updatePatient);
router.delete("/:id", authenticateToken, deletePatient);

export default router;
