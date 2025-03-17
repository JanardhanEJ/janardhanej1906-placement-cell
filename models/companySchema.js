// Importing mongoose library to define schemas and interact with MongoDB
import mongoose from "mongoose";

// Define the schema for the 'Company' collection
const companySchema = new mongoose.Schema(
  {
    // Company name should be unique to avoid duplicates
    name: {
      type: String,
      unique: true, // Ensures that each company name is unique
    },
    // Array to store details of students associated with the company
    students: [
      {
        // Reference to the 'Student' model using the student's ObjectId
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student", // Establishes a relationship with the 'Student' model
        },
        date: {
          type: Date,
          required: true, // Date of the interview is required field
        },
        // Result of the interview with predefined possible values
        result: {
          type: String,
          enum: [
            "On Hold",
            "Selected",
            "Pending",
            "Not Selected",
            "Did not Attempt",
          ], // Restricts values to these options
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
  }
);

const Company = mongoose.model("Company", companySchema); // Create the 'Company' model based on the defined schema

export default Company; // Export the 'Company' model to use in other parts of the application
