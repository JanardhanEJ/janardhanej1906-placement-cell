import passport from "passport"; // Importing passport module for handling user authentication
import passportLocal from "passport-local"; // Importing passport-local to define a local authentication strategy
import User from "../models/userSchema.js"; // Importing User model/schema to access user data from the database

const LocalStrategy = passportLocal.Strategy; // Extract the LocalStrategy from passport-local

// Define the local strategy for user authentication
const local = new LocalStrategy({ usernameField: "email" }, function ( // Use 'email' as the username field
  email,
  password,
  done
) {
  // Search for a user by email in the database
  User.findOne({ email }, function (error, user) {
    if (error) {
      // Log the error if the query fails
      console.log(`Error while finding user: ${error}`);
      return done(error);
    }

    // If the user is not found or the password is incorrect, return false
    if (!user || !user.isPasswordCorrect(password)) {
      console.log("Invalid Email/Password");
      return done(null, false);
    }

    // If the user is found and password matches, return the user object
    return done(null, user);
  });
});

// Register the local strategy with passport
passport.use("local", local);

// Serialize the user ID to store it in the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize the user ID from the session to retrieve the user object
passport.deserializeUser(function (id, done) {
  // Find the user by user ID in the database
  User.findById(id, function (err, user) {
    if (err) {
      // Handle database error
      console.log("Error while finding user --> Passport");
      return done(err);
    }
    // Return the user object if found
    return done(null, user);
  });
});

// Middleware function to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    // If the user is authenticated, proceed to the next middleware
    return next();
  }
  // If the user is not authenticated, redirect to the sign-in page
  return res.redirect("/users/signin");
};

// Middleware function to set the authenticated user object for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // If user is authenticated, store the authenticated user object in `res.locals` for access in views
    res.locals.user = req.user;
  }
  next();
};

export default passport; // Export the passport instance to use across the application
