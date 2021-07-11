import express from "express"
const router = express.Router();
import requireLogin from "../middleware/requireLogin.js";
import Wishlist from "../Model/Wishlist.js";
import { addwishlistController, mywishlistController, removewishlistController } from "../controllers/wishlistController.js"

router.post("/addwishlist", requireLogin, addwishlistController);

router.get("/mywishlist", requireLogin, mywishlistController);

router.put("/removewishlist", removewishlistController);


export default router;