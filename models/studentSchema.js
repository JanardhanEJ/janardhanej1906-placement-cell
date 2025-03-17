// Importing mongoose library to define schemas and interact with MongoDB
import mongoose from "mongoose";

// Define the schema for the 'Student' collection
const studentSchema = new mongoose.Schema(
  {
    // Student's full name (required field)
    name: {
      type: String,
      required: true,
    },
    // Student's email address (must be unique and required)
    email: {
      type: String,
      unique: true, // Ensures email is unique across all students
      required: true,
    },
    // Name of the student's college (required field)
    college: {
      type: String,
      required: true,
    },
    // Placement status with predefined options (required field)
    placement: {
      type: String,
      required: true,
      enum: ["Placed", "Not Placed"], // Limits the value to specific options
    },
    // Student's contact number (required field)
    contactNumber: {
      type: Number,
      required: true,
    },
    // Batch or group identifier (required field)
    batch: {
      type: String,
      required: true,
    },
    // DSA (Data Structures and Algorithms) final score (required field)
    dsa: {
      type: Number,
      required: true,
    },
    // Web development final score (required field)
    webd: {
      type: Number,
      required: true,
    },
    // React final score (required field)
    react: {
      type: Number,
      required: true,
    },
    // Array to store details of student's interview history
    interviews: [
      {
        // Name of the company where the student was interviewed
        company: {
          type: String,
        },
        // Date of the interview (stored as a string for formatting flexibility)
        date: {
          type: String,
        },
        // Interview result with predefined options
        result: {
          type: String,
          enum: [
            "On Hold",
            "Selected",
            "Pending",
            "Not Selected",
            "Did not Attempt",
          ], // Restricts the value to specific options
        },
      },
    ],
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

const Student = mongoose.model("Student", studentSchema); // Create the 'Student' model based on the defined schema

export default Student; // Export the 'Student' model to use it in other parts of the application
