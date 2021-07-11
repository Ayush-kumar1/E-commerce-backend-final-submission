import dotenv from 'dotenv';

dotenv.config();

import express from "express"
const router = express.Router();
import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginController, signupcontroller } from "../controllers/authController.js";



router.post("/signup", signupcontroller);
router.post("/login", loginController);
export default router;