import express from "express"; // Importing express for the web framework or to create the authentication router
import passport from "passport"; // Importing passport for authentication
import UserController from "../controllers/userControllers.js"; // Importing UserController to handle user-related operations

const userControllers = new UserController(); // Creating an instance of UserController to handle user operations
const router = express.Router(); // Creating an instance of express Router for handling authentication routes

// ===============
// GET requests
// ===============

//Render the signup page for user registration
router.get("/signup", userControllers.signup);

//Render the signin page for user login
router.get("/signin", userControllers.signin);

router.get(
  "/signout", // Endpoint for user logout
  passport.checkAuthentication, // Middleware to ensure user is authenticated
  userControllers.signout // Controller method to handle user logout
);

router.get(
  "/download-csv", // Endpoint for downloading CSV report
  passport.checkAuthentication, // Middleware to ensure user is authenticated
  userControllers.downloadCsv // Controller method to handle CSV generation and download
);

// ===============
// POST request
// ===============
router.post(
  "/create", // Endpoint for creating a new user
  userControllers.createUser // Controller method to handle user registration
);

router.post(
  "/create-session", // Endpoint for creating a session
  passport.authenticate("local", { failureRedirect: "/users/signin" }), // Middleware for local authentication
  userControllers.createSession // Controller method to create user session
);

export default router; // Export the router to be used in other parts of the application
