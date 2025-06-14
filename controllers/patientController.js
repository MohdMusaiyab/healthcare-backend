import { Patient } from "../models/associations.js";
import { validationResult } from "express-validator";

const handleValidationErrors = (errors, res) => {
  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: errors.array(),
  });
};

export const createPatient = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleValidationErrors(errors, res);

    const patient = await Patient.create({
      ...req.body,
      userId: req.user.id,
    });

    const { userId, ...patientData } = patient.toJSON();

    return res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patientData,
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

export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll({
      where: { userId: req.user.id },
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      order: [["name", "ASC"]],
    });

    return res.json({
      success: true,
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

export const getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, userId: req.user.id },
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.json({
      success: true,
      data: patient,
      message: "Patient retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleValidationErrors(errors, res);

    const [affectedCount] = await Patient.update(req.body, {
      where: { id: req.params.id, userId: req.user.id },
    });

    if (affectedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const updatedPatient = await Patient.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
    });

    return res.json({
      success: true,
      message: "Patient updated successfully",
      data: updatedPatient,
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

export const deletePatient = async (req, res, next) => {
  try {
    const deletedCount = await Patient.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
