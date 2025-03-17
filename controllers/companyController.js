import Student from "../models/studentSchema.js"; // Importing Student model/schema
import Company from "../models/companySchema.js"; // Importing Company model/schema

export default class CompanyController {
  // Render the company page with student data
  async companyPage(req, res) {
    try {
      const students = await Student.find({}); // Fetch all students from the database
      return res.render("company", { students }); // Render the 'company' view and pass the student data to it
    } catch (error) {
      console.log(`Error in rendering company page: ${error}`); // Log any errors encountered while rendering the page
      return res.redirect("back");  // Redirect back to the previous page if an error occurs
    }
  }

  // Render the allocate interview page with student and batch data
  async allocateInterview(req, res) {
    try {
      const students = await Student.find({}); // Fetch all students from the database

      let array = [];

      for (let student of students) {
        array.push(student.batch); // Extract unique batches from the student data into 'array'
      }
      // Filter out duplicate batches using Set
      array = [...new Set(array)];

      return res.render("allocateInterview", { students, array }); // Render the 'allocateInterview' view with student and batch data
    } catch (error) {
      console.log(`Error in allocating interview: ${error}`); // Log any errors encountered while rendering the page
      return res.redirect("back"); // Redirect back to the previous page if an error occurs
    }
  }

  // Schedule an interview for a student with a company
  async scheduleInterview(req, res) {
    const { id, company, date } = req.body; // Extract student id, company name and date from request body
    try {
      const existingCompany = await Company.findOne({ name: company }); // Check if the company already exists in the database

      // Create an interview object for the student
      const obj = {
        student: id,
        date,
        result: "Pending", // Default status is "Pending"
      };

      if (!existingCompany) {
        // If the company doesn't exist, create a new entry
        const newCompany = await Company.create({
          name: company,
        });
        newCompany.students.push(obj); // Add interview to the company's student list
        newCompany.save(); // Save the new company record
      } else {
        // Check if the student already has an interview with this company
        for (let student of existingCompany.students) {
          if (student.student._id === id) {
            console.log("Interview with this student already scheduled");
            return res.redirect("back"); // Prevent duplicate scheduling
          }
        }
        existingCompany.students.push(obj); // Add the new interview to the existing company record
        existingCompany.save(); // Save changes
      }

      const student = await Student.findById(id); // Find the student by id

      // Add the interview details to the student's record
      if (student) {
        const interview = {
          company,
          date,
          result: "Pending",
        };
        student.interviews.push(interview);
        student.save(); // Save changes to student record
      }
      console.log("Interview Scheduled Successfully"); // Log success message
      return res.redirect("/company/home"); // Redirect to company homepage
    } catch (error) {
      console.log(`Error in scheduling Interview: ${error}`);  // Log any errors encountered during scheduling
      return res.redirect("back"); // Redirect back to the previous page if an error occurs
    }
  }

  // Update the status of an interview
  async updateStatus(req, res) {
    const { id } = req.params; // Extract student ID from request params
    const { companyName, companyResult } = req.body; // Extract company name and result from request body
    try {
      const student = await Student.findById(id); // Find the student by id

      // Find the matching interview and update the result
      if (student && student.interviews.length > 0) {
        for (let company of student.interviews) {
          if (company.company === companyName) {
            company.result = companyResult; // Update interview result for student
            student.save(); // Save updated status to database
            break;
          }
        }
      }

      // Find the company by name and update the result for the student
      const company = await Company.findOne({ name: companyName });
      if (company) {
        for (let std of company.students) {
          if (std.student.toString() === id) {
            std.result = companyResult;
            company.save(); // Save updated status to database
          }
        }
      }
      console.log("Interview status updated successfully"); // Log success message
      return res.redirect("back"); // Redirect back after successful update
    } catch (error) {
      console.log(`Error in updating interview status: ${error}`); // Log any errors encountered during the update
      res.redirect("back"); // Redirect back if an error occurs
    }
  }
}
