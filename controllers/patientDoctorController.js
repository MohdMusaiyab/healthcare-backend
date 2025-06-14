import { Patient, Doctor, PatientDoctor } from "../models/associations.js";
import { validationResult } from "express-validator";

const handleValidationErrors = (errors, res) => {
  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: errors.array(),
  });
};

export const assignDoctorToPatient = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleValidationErrors(errors, res);

    const { patientId, doctorId } = req.body;

    // Verify patient exists and belongs to requesting user
    const patient = await Patient.findOne({
      where: { id: patientId, userId: req.user.id },
    });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found or unauthorized",
      });
    }

    // Verify doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check for existing assignment
    const existingAssignment = await PatientDoctor.findOne({
      where: { patientId, doctorId },
    });
    if (existingAssignment) {
      return res.status(409).json({
        success: false,
        message: "Doctor already assigned to this patient",
      });
    }

    const assignment = await PatientDoctor.create({ patientId, doctorId });

    res.status(201).json({
      success: true,
      message: "Doctor assigned successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("Assignment error:", error);
    next(error);
  }
};

export const getAllPatientDoctorAssignments = async (req, res, next) => {
  try {
    const assignments = await PatientDoctor.findAll({
      include: [
        {
          model: Patient,
          where: { userId: req.user.id },
          attributes: ["id", "name", "email"],
          required: true,
        },
        {
          model: Doctor,
          attributes: ["id", "name", "specialization"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json({
      success: true,
      data: assignments,
      message: "Assignments fetched successfully",
    });
  } catch (error) {
    console.error("Fetch assignments error:", error);
    next(error);
  }
};

export const getPatientDoctors = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    // Verify patient exists and belongs to requesting user
    const patient = await Patient.findOne({
      where: { id: patientId, userId: req.user.id },
    });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found or unauthorized",
      });
    }

    const doctors = await Doctor.findAll({
      include: [
        {
          model: PatientDoctor,
          where: { patientId },
          attributes: ["assignedDate"],
          required: true,
        },
      ],
      order: [[PatientDoctor, "assignedDate", "DESC"]],
    });

    return res.json({
      success: true,
      message: "Patient doctors fetched successfully",
      data: {
        patient: { id: patient.id, name: patient.name },
        doctors,
      },
    });
  } catch (error) {
    console.error("Fetch patient doctors error:", error);
    next(error);
  }
};

export const removeDoctorFromPatient = async (req, res, next) => {
  try {
    const assignment = await PatientDoctor.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Patient,
          where: { userId: req.user.id },
          required: true,
        },
      ],
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found or unauthorized",
      });
    }

    await assignment.destroy();

    returnres.json({
      success: true,
      message: "Doctor removed from patient successfully",
    });
  } catch (error) {
    console.error("Remove assignment error:", error);
    next(error);
  }
};
