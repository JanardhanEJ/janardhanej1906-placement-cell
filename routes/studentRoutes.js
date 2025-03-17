import express from "express"; // Importing express for the web framework or to create the authentication router
import passport from "../config/passport-local-strategy.js"; // Importing Passport configuration for authentication
import StudentController from "../controllers/studentController.js"; // Importing StudentController to handle student operations

const router = express.Router(); // Creating an instance of express Router for defining API routes

const studentController = new StudentController(); // Creating an instance of StudentController to handle student-related routes

// ===============
// GET requests
// ===============
router.get(
  "/create", // Endpoint for rendering create student page
  passport.checkAuthentication, // Middleware to check user authentication
  studentController.createStudentPage // Controller method to create a student
);

router.get(
  "/delete/:id", // Endpoint for deleting a student by studentID
  passport.checkAuthentication, // Middleware to check user authentication
  studentController.deleteStudent // Controller method to delete a student
);

// ===============
// POST requests
// ===============
router.post(
  "/create-student", // Endpoint for creating a student
  passport.checkAuthentication, // Middleware to check user authentication
  studentController.createStudent // Controller method to handle student creation
);

export default router; // Export the router to be used in other parts of the application
