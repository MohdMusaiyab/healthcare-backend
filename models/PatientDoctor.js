import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const PatientDoctor = sequelize.define('PatientDoctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patients',
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Doctors',
      key: 'id',
    },
  },
  assignedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
