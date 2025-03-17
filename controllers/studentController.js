import Company from "../models/companySchema.js"; // Importing Company model/schema
import Student from "../models/studentSchema.js"; // Importing Student model/schema

export default class StudentController {
  // Render the page for adding a new student
  createStudentPage(req, res) {
    return res.render("add_student"); // Render 'add_student' view
  }

  // Method to create a new student
  async createStudent(req, res) {
    const {
      name,
      email,
      batch,
      college,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    } = req.body; // Extract student details from request body
    try {
      const student = await Student.findOne({ email }); // Check if a student with the same email already exists

      if (student) {
        console.log(`Student with email ${email} already exists`); // Log error if student with the same email exists
        return res.redirect("back"); // Redirect back if email is already taken
      }

      // Create a new student record and save to the database
      const newStudent = await Student.create({
        name,
        email,
        college,
        batch,
        placement,
        contactNumber,
        dsa,
        webd,
        react,
      });
      await newStudent.save(); // Save the new student object in the database

      return res.redirect("/"); // Redirect to home page after successful creation
    } catch (error) {
      console.log(`Failed to create student - ${error}`); //Improved error logging if student creation fails
      return res.redirect("back"); // Redirect back if there's an error
    }
  }

  // Method to delete a student
  async deleteStudent(req, res) {
    const { id } = req.params; // Extract student ID from request parameters
    try {
      const student = await Student.findById(id); // Find the student by id

      if (student && student.interviews.length > 0) {
        for (let item of student.interviews) {
          const company = await Company.findOne({ name: item.company }); // Find the company associated with the interview

          if (company) {
            for (let i = 0; i < company.students.length; i++) {
              if (company.students[i].student.toString() === id) {
                company.students.splice(i, 1); // Remove student reference from the company's students list
                await company.save(); // Save updated company record
                break;
              }
            }
          }
        }
      }

      await Student.findByIdAndDelete(id); // Delete the student from the database
      res.redirect("back"); // Redirect back after successful deletion
    } catch (error) {
      console.log(`Failed to delete student - ${error}`); // // Improved error logging if student deletion fails
      return res.redirect("back"); // Redirect back if an error occurs
    }
  }
}
