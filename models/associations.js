import { User } from './User.js';
import { Patient } from './Patient.js';
import { Doctor } from './Doctor.js';
import { PatientDoctor } from './PatientDoctor.js';

// User-Patient relationship
User.hasMany(Patient, { foreignKey: 'userId', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'userId' });

// Patient-Doctor many-to-many relationship
Patient.belongsToMany(Doctor, { 
  through: PatientDoctor, 
  foreignKey: 'patientId',
  otherKey: 'doctorId',
  as: 'doctors'
});

Doctor.belongsToMany(Patient, { 
  through: PatientDoctor, 
  foreignKey: 'doctorId',
  otherKey: 'patientId',
  as: 'patients'
});

// Direct associations for PatientDoctor
PatientDoctor.belongsTo(Patient, { foreignKey: 'patientId' });
PatientDoctor.belongsTo(Doctor, { foreignKey: 'doctorId' });
Patient.hasMany(PatientDoctor, { foreignKey: 'patientId' });
Doctor.hasMany(PatientDoctor, { foreignKey: 'doctorId' });

export { User, Patient, Doctor, PatientDoctor };