# Healthcare Backend System

A secure Node.js/Express.js backend for healthcare management with PostgreSQL, JWT authentication, and RESTful APIs for patient-doctor record management.

🚀 **Live API Base URL**: [https://healthcare-backend-z1bi.onrender.com](https://healthcare-backend-z1bi.onrender.com)

## Features

- ✅ JWT Authentication (Register/Login)
- 🏥 Patient Management (CRUD operations)
- 👨‍⚕️ Doctor Management (CRUD operations)
- 🔗 Patient-Doctor Assignment System
- 🔒 Role-based access control
- 🛡️ Secure API endpoints
- 📊 PostgreSQL database with Sequelize ORM

## API Endpoints

### Authentication
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | /api/auth/register| Register new user          |
| POST   | /api/auth/login   | Login user (get JWT token) |

### Patient Management
| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| POST   | /api/patients     | Create new patient (Auth required) |
| GET    | /api/patients     | Get all patients (Auth required) |
| GET    | /api/patients/:id | Get single patient (Auth required) |
| PUT    | /api/patients/:id | Update patient (Auth required)   |
| DELETE | /api/patients/:id | Delete patient (Auth required)   |

### Doctor Management
| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | /api/doctors     | Create new doctor (Auth required) |
| GET    | /api/doctors     | Get all doctors (Auth required) |
| GET    | /api/doctors/:id | Get single doctor (Auth required) |
| PUT    | /api/doctors/:id | Update doctor (Auth required)   |
| DELETE | /api/doctors/:id | Delete doctor (Auth required)   |

### Patient-Doctor Mapping
| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | /api/mappings      | Assign doctor to patient (Auth required) |
| GET    | /api/mappings      | Get all mappings (Auth required)      |
| GET    | /api/mappings/:patientId | Get doctors for patient (Auth required) |
| DELETE | /api/mappings/:id  | Remove doctor from patient (Auth required) |

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Environment Management**: dotenv
- **Validation**: express-validator

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm/yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MohdMusaiyab/healthcare-backend.git
   cd healthcare-backend

2. Install dependencies:
   ```bash
   npm install

3. Set up environment variables:
   ```bash
   cp .env.example .env

4. Edit .env file according to you.
5. Start the server.
   ```bash
   npm run dev
