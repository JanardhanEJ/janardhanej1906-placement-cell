import express from "express"; // Importing express for the web framework or to create the authentication router
import dotenv from "dotenv"; // Importing dotenv for loading environment variables
import path from "path"; // Importing path for handling Built-in module file paths

// Initialize dotenv to access/load environment variables from .env file
dotenv.config({ path: path.resolve("config/.env") });

import mongoose from "mongoose"; // Importing mongoose for MongoDB interactions
import session from "express-session"; // Importing express-session for session management
import passport from "passport"; // Importing passport for authentication
import ejsLayouts from "express-ejs-layouts"; // Importing express-ejs-layouts for layout support with EJS

import passportLocal from "./config/passport-local-strategy.js"; // Importing local passport strategy for authentication
import router from "./routes/index.js"; // Importing application routes
import db from "./config/mongoose.js"; /// Importing MongoDB database connection function

const port = process.env.PORT || 8000; // Default port is set to 8000 if PORT environment variable is not set

// Initializing express application instance
const app = express();

// Set up EJS as the template engine and configure the views directory
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(ejsLayouts); // Enable layout support for EJS

// ---- SESSION CONFIGURATION ----
app.use(
  session({
    secret: "secret", // Secret key for encrypting session data
    resave: false, // Prevent resaving unchanged sessions
    saveUninitialized: false, // Only create sessions when data is stored
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // Session lasts for 24 hours
  })
);

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.resolve(), "public")));

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: true }));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware to make the authenticated user available in views
app.use(passport.setAuthenticatedUser);

// Register routes from the router module
app.use("/", router);

// Start the server and listen for incoming connections
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
});
