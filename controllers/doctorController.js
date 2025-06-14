import { Doctor } from "../models/Doctor.js";
import { validationResult } from "express-validator";
// Helper function for validation errors
const handleValidationErrors = (errors, res) => {
  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: errors.array(),
  });
};

export const createDoctor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleValidationErrors(errors, res);

    const doctor = await Doctor.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    next(error);
  }
};

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.json({
      success: true,
      data: doctors,
      message: "Doctors retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.json({
      success: true,
      data: doctor,
      message: "Doctor retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleValidationErrors(errors, res);

    const [affectedCount] = await Doctor.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const updatedDoctor = await Doctor.findByPk(req.params.id);
    return res.json({
      success: true,
      message: "Doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const deletedCount = await Doctor.destroy({
      where: { id: req.params.id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
