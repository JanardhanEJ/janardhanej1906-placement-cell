import express from "express"; // Importing express for the web framework or to create the authentication router
import passport from "passport"; // Importing passport for authentication
import CompanyController from "../controllers/companyController.js"; // Importing the CompanyController to handle route callbacks

const router = express.Router(); // Creating an instance of express Router for handling authentication routes
const companyController = new CompanyController(); // Create an instance of CompanyController to handle route callbacks

// ===============
// GET requests
// ===============
router.get(
  "/home", // Endpoint for rendering company page
  passport.checkAuthentication, // Middleware to check user authentication
  companyController.companyPage // Controller method to handle request
);

router.get(
  "/allocate", // Endpoint for rendering interview allocation page
  passport.checkAuthentication, // Middleware to check user authentication
  companyController.allocateInterview // Controller method to handle request
);

// ===============
// POST requests
// ===============
router.post(
  "/schedule-interview", // Endpoint for scheduling an interview
  passport.checkAuthentication, // Middleware to check user authentication
  companyController.scheduleInterview // Controller method to handle request
);

router.post(
  "/update-status/:id", // Endpoint for updating interview status
  passport.checkAuthentication, // Middleware to check user authentication
  companyController.updateStatus // Controller method to handle request
);

export default router; // Export the router to be used in other parts of the application
