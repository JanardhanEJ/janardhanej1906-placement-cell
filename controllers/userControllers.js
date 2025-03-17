import User from "../models/userSchema.js"; // Importing User model/schema
import Student from "../models/studentSchema.js"; // Importing Student model/schema
import fs from "fs"; // Importing Node.js file system module
import fastcsv from "fast-csv"; // Importing fast-csv for CSV processing

export default class UserController {
  // Render the Signup page
  signup(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("back"); // Redirect back if user is already authenticated
    }
    res.render("signup"); // Render 'signup' view
  }

  // Render the Signin page
  signin(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("back"); // Redirect back if user is already authenticated
    }
    res.render("signin"); /// Render 'signin' view
  }

  // Create a session for the user after successful login
  createSession(req, res) {
    console.log("Session created successfully");
    return res.redirect("/"); // Redirect to home page after successful login
  }

  // Sign out the user and destroy the session
  signout(req, res) {
    req.logout(function (err) {
      if (err) {
        console.error(`Error logging out - ${err.message}`);
        return next(err); // Handle error if logout fails
      }
    });
    return res.redirect("/users/signin"); // Redirect to signin page after logout
  }

  // Create a new user
  async createUser(req, res) {
    const { name, email, password, confirmPassword } = req.body; // Extract user details from request body
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        console.log(`Passwords don't match`);
        return res.redirect("back"); // Redirect back if passwords don't match
      }
      const user = await User.findOne({ email });  // Check if the user already exists

      if (user) {
        console.log(`User with email ${email} already exists`);
        return res.redirect("back"); // Redirect back if email already exists
      }

      // Create a new user
      const newUser = await User.create({
        name,
        email,
        password,
      });

      await newUser.save(); // Save new user to database

      if (!newUser) {
        console.log(`Error in creating user: ${error}`);
        return res.redirect("back"); // Redirect back if user creation fails
      }

      console.log(`User created successfully: ${newUser.name} (${newUser.email})`);

      return res.redirect("/users/signin"); // Redirect to signin page after successful registration
    } catch (error) {
      console.log(`Error in creating user: ${error}`);
      res.redirect("back"); // Redirect back if there's an error
    }
  }

  // Download student report in CSV format
  async downloadCsv(req, res) {
    try {
      const students = await Student.find({}); // Fetch all student records from the database

      let data = "";
      let no = 1;
      // Prepare CSV header
      let csv =
        "S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result";

      // Build CSV data row by row
      for (let student of students) {
        data =
          no +
          "," +
          student.name +
          "," +
          student.email +
          "," +
          student.college +
          "," +
          student.placement +
          "," +
          student.contactNumber +
          "," +
          student.batch +
          "," +
          student.dsa +
          "," +
          student.webd +
          "," +
          student.react;

        // Add interview data if available
        if (student.interviews.length > 0) {
          for (let interview of student.interviews) {
            data +=
              "," +
              interview.company +
              "," +
              interview.date.toString() +
              "," +
              interview.result;
          }
        }
        no++;
        csv += "\n" + data;
      }

      // Write CSV data to file
      const dataFile = fs.writeFile(
        "report/data.csv",
        csv,
        function (error, data) {
          if (error) {
            console.log(`Error in Writing CSV Report: ${error}`);
            return res.redirect("back"); // Redirect back if there's an error
          }
          console.log("CSV Report generated successfully");
          return res.download("report/data.csv"); // Trigger CSV file download
        }
      );
    } catch (error) {
      console.log(`Error in Generating CSV Report: ${error}`);
      return res.redirect("back"); // Redirect back if there's an error
    }
  }
}
