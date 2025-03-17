import mongoose from "mongoose"; // Importing mongoose library to define schemas and interact with MongoDB
import bcrypt from "bcrypt"; // Importing bcrypt library for secure password hashing

// Define the schema for the 'User' collection
const userSchema = new mongoose.Schema(
  {
    // User's full name (required field)
    name: {
      type: String,
      required: true,
    },
    // User's email address (must be unique and required)
    email: {
      type: String,
      unique: true, // Ensures that no two users have the same email
      required: true,
    },
    // Hashed version of the user's password (required field)
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

// Define a virtual field `password` to handle password hashing
userSchema.virtual("password").set(function (value) {
  this.passwordHash = bcrypt.hashSync(value, 12); // Hash the provided password using bcrypt with a salt factor of 12
});

// Method to check if the provided password matches the stored hash
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compareSync(password, this.passwordHash); // Compare the provided password with the stored hash
};

const User = mongoose.model("User", userSchema); // Create the 'User' model based on the defined schema

export default User; // Export the 'User' model to use in other parts of the application
