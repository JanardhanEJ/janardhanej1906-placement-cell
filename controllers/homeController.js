import Student from "../models/studentSchema.js"; // Importing Student model/schema

// Define HomeController class to handle home page rendering and student data loading
export default class HomeController {
  // Method to render the home page and load student data
  async homePage(req, res) {
    try {
      const students = await Student.find({}); // Fetch all student records from the database
      return res.render("home", { students }); // Render the 'home' view and pass the fetched student data to it
    } catch (error) {
      // Log the error for debugging purposes
      console.error(`Error occured while fetching student's data: ${error.message}`);

      // Respond with a 500 status and an error message if fetching fails
      return res.status(500).send("An error occurred while fetching student's data.");
    }
  }
}
