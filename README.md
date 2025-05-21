StoreRater
StoreRater is a full-stack web application built as part of a coding challenge. It allows users to rate stores on a scale of 1 to 5, with role-based access for System Administrators, Normal Users, and Store Owners. The backend is powered by Express.js (ES Modules) with PostgreSQL, Zod for validation, and Nodemailer for email notifications. The frontend is developed using React with Tailwind CSS for styling. The application follows best practices for security, scalability, and maintainability.
Features
User Roles and Functionalities

System Administrator:
Add new stores, normal users, and admin users.
View a dashboard with total users, stores, and ratings.
List and filter users/stores by name, email, address, and role.
View detailed user/store information, including ratings for store owners.


Normal User:
Sign up and log in with email and password.
Update password with email confirmation.
View, search, and sort stores by name and address.
Submit and modify ratings (1-5) for stores.


Store Owner:
Log in and update password with email confirmation.
View a dashboard with their store’s ratings and average rating.



Form Validations

Name: 20-60 characters.
Email: Standard email format.
Address: Max 400 characters.
Password: 8-16 characters, with at least one uppercase letter and one special character.

Additional Features

Role-based authentication using JWT.
Email notifications for signup and password updates via Nodemailer.
Sorting and filtering for all listings (ascending/descending by key fields).
PostgreSQL database with optimized schema and indexes for performance.

Tech Stack

Backend:
Express.js (ES Modules)
PostgreSQL with Sequelize ORM
Zod for input validation
Nodemailer for email notifications
JWT for authentication
Bcrypt for password hashing


Frontend:
React.js
Tailwind CSS


Environment: Node.js, dotenv for configuration
Dependencies: cors, pg, nodemon (dev)

Getting Started
Prerequisites

Node.js (v18 or higher)
PostgreSQL (v13 or higher)
Gmail account (for Nodemailer; generate an App Password if using 2FA)

Installation

Clone the Repository:
git clone https://github.com/your-username/StoreRater.git
cd StoreRater


Install Dependencies:
npm install


Set Up Environment Variables:Create a .env file in the root directory and add:
DB_NAME=store_rater_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=3000
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password


Set Up PostgreSQL:

Create a database named store_rater_db.
Run the SQL schema from schema.sql:psql -U postgres -d store_rater_db -f src/schema.sql




Run the Backend:
npm run dev

The server will start at http://localhost:3000.


API Endpoints
Authentication

POST /api/auth/register: Register a new user (Normal User only).
Body: { "name": "John Doe Long Name", "email": "john@example.com", "address": "123 Main St", "password": "Password!123" }


POST /api/auth/login: Log in and get JWT token.
Body: { "email": "john@example.com", "password": "Password!123" }


PATCH /api/auth/update-password: Update password (authenticated).
Body: { "oldPassword": "Password!123", "newPassword": "NewPass!456" }



Admin (requires ADMIN role and JWT)

POST /api/admin/users: Create a new user.
Body: { "name": "Jane Admin Long Name", "email": "jane@example.com", "address": "456 Oak St", "password": "Admin!123", "role": "ADMIN" }


GET /api/admin/users: List users with filters (e.g., ?name=John&sortBy=name&sortOrder=asc).
POST /api/admin/stores: Create a new store.
Body: { "name": "Jane's Store Long Name", "email": "store@example.com", "address": "789 Pine St", "ownerId": 1 }


GET /api/admin/stores: List stores with filters (e.g., ?name=Store&sortBy=name&sortOrder=asc).
GET /api/admin/dashboard: Get dashboard stats (total users, stores, ratings).

User and Store Owner endpoints are under development.
Project Structure
StoreRater/
├── src/
│   ├── config/          # Database and Nodemailer setup
│   ├── middleware/      # Authentication and error handling
│   ├── models/          # Sequelize models
│   ├── routes/          # Express routes
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Business logic
│   ├── index.js         # Entry point
│   ├── schema.sql       # PostgreSQL schema
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
├── README.md            # This file

Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.
License
This project is licensed under the MIT License.
Contact
For questions or feedback, reach out via GitHub issues.
