import express from "express"
const router = express.Router();
import User from "../Model/User.js";
import Product from "../Model/Product.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import requireLogin from "../middleware/requireLogin.js";
import Wishlist from "../Model/Wishlist.js";
import { addproductController, addwishlistController, allproductController } from "../controllers/productController.js"

router.post("/addProduct", addproductController);


router.get("/allproduct", allproductController);

router.post("/addtowishlist", requireLogin, addwishlistController);


export default router;