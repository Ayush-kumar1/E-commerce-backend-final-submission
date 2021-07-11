import express from "express"
const router = express.Router();
import Cart from "../Model/Cart.js";
import requireLogin from "../middleware/requireLogin.js";
import { mycartController, addcartController, incrementerController, decrementController, removeController } from "../controllers/cartController.js";


router.get("/mycart", requireLogin, mycartController);

router.post("/addcart", requireLogin, addcartController);

router.put("/incrementer", incrementerController)

router.put("/decrementer", decrementController);

router.put("/removecart", removeController);


export default router;