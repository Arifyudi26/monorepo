import express from "express";
import bodyParser from "body-parser";
import cors from "cors";  
import userRoutes from "../routes/userRoutes";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(bodyParser.json());

app.use("/api", userRoutes);

export default app;
