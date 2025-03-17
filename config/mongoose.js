// Import necessary modules
import mongoose from "mongoose"; // Importing mongoose module for interacting with MongoDB
import dotenv from "dotenv"; // Importing dotenv module to load environment variables securely
import path from "path"; // Importing path module to work with file and directory paths

// Load environment variables from the .env file located in the 'config' directory
dotenv.config({ path: path.resolve("config/.env") });

// Disable the `strictQuery` option to avoid deprecation warnings when using mongoose query filters
mongoose.set("strictQuery", false);

// Define the MongoDB connection URI using the environment variable
const mongoURI = process.env.MONGODB_URI;

// Log the MongoDB connection URI to help with debugging
console.log("MongoDB URI:", mongoURI);

// If the MongoDB URI is not defined, throw an error to avoid connection issues
if (!mongoURI) {
  throw new Error("MongoDB URI is not provided. Check your environment configuration..");
}

// Establish a connection to MongoDB using mongoose with options to handle deprecation warnings
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection; // Get the default mongoose connection

// Handle MongoDB connection errors and log them to the console
db.on("error", console.error.bind(console, "Failed to connect to MongoDB"));

// Log a success message once the database connection is established
db.once("open", function () {
  console.log("Successfully connected to MongoDB DataBase");
});

// Export the mongoose instance to enable its use in other parts of the application
export default mongoose;
