import express from "express";
import { body } from "express-validator";
import { authenticateToken } from "../middleware/auth.js";

import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

// Shared validation rules
const doctorValidation = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("phone").trim().notEmpty().withMessage("Phone number required"),
  body("specialization")
    .trim()
    .notEmpty()
    .withMessage("Specialization required"),
  body("experience")
    .isInt({ min: 0 })
    .withMessage("Experience must be a non-negative integer"),
  body("qualification").trim().notEmpty().withMessage("Qualification required"),
];

router.post("/", authenticateToken, doctorValidation, createDoctor);
router.get("/", authenticateToken, getAllDoctors);
router.get("/:id", authenticateToken, getDoctorById);
router.put("/:id", authenticateToken, doctorValidation, updateDoctor);
router.delete("/:id", authenticateToken, deleteDoctor);

export default router;
