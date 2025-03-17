import express from "express"; // Importing express for the web framework or to create the authentication router
import passport from "passport"; // Importing passport for authentication
import HomeController from "../controllers/homeController.js"; // Importing HomeController to handle home page logic
import studentRoutes from "./studentRoutes.js"; // Importing student routes from studentRoute.js
import userRoutes from "./userRoutes.js"; // Importing user routes from userRoutes.js
import companyRoutes from "./companyRoute.js"; // Importing company routes from companyRoute.js

const router = express.Router(); // Creating an instance of express Router for handling authentication routes
const homeController = new HomeController(); // Creating an instance of HomeController to handle home page logic

// Render the home page
router.get(
    "/", // Endpoint for the home page
    passport.checkAuthentication, // Middleware to check user authentication
    homeController.homePage // Controller method to handle the request
);

// Mounting sub-routers
router.use("/students", studentRoutes); // Mounting student routes under /students
router.use("/company", companyRoutes); // Mounting company routes under /company
router.use("/users", userRoutes); // Mounting user routes under /users

export default router; // Export the router to be used in other parts of the application
