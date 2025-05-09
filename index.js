import bodyParser from "body-parser";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";



const app = express();

// Middleware to parse incoming JSON requests
// This middleware allows the server to understand JSON data sent in requests

app.use(bodyParser.json());

app.use((req, res, next) => {
  const tokenString = req.headers["authorization"]; 

  if (tokenString != null) {
    const token = tokenString.replace("Bearer ", ""); 
    
    jwt.verify(token, "Dew2003kith", (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        next();
      } else {
        console.log("invalid token");
        res.status(403).json({
          message: "Invalid token",
        });
      }
    });

  } else {
    next();
  }
});




mongoose.connect(
    "mongodb+srv://admin:123@cluster0.xjb2uho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
    console.error(err);
    
  });

app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
