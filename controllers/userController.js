import bctypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export function createUser(req, res) {
  if (req.body.role == "admin") {
    if (req.user != null) {
      if (req.user.role !== "admin") {
        res.status(403).json({
          message: "You are not authorized to create an admin user",
        });
        return;
      }
    } else {
      res.status(403).json({
        message: "You are not authorized to create an admin user. Please login first",
      });
      return;
    }
  }

  const hashedPassword = bctypt.hashSync(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    role: req.body.role,
  });

  user.save()
    .then(() => {
      res.json({
        message: "User saved",
      });
    })
    .catch(() => {
      res.json({
        message: "Error saving user",
      });
    });
}

export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // "user" represents the document retrieved from the "users" collection in the database
  // If a user with the specified email exists, "user" will contain the user document
  // If no user is found, "user" will be null
  User.findOne({ email: email }).then((user) => {
    if (user == null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      // Compare the password with the hashed password
      const isPasswordValid = bctypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            img: user.img,
          },
          "Dew2003kith"
        );

        res.json({
          message: "Login successful",
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Invalid password",
        });
      }
    }
  });
}

//testing commit

export function isAdmin(req){
    if (req.user == null) {
      return false;
    }
    if (req.user.role !== "admin") {
      return false;
  }
  return true;
}