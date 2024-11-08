import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/userRoute.js';
import cookieParser from "cookie-parser"

const app = express();

dotenv.config();  

// Middleware
app.use(cors()); 
app.use(express.json());  
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);

export default app;
