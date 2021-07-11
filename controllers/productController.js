import User from "../Model/User.js";
import Product from "../Model/Product.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import requireLogin from "../middleware/requireLogin.js";
import Wishlist from "../Model/Wishlist.js";

const addproductController = (req, res) => {
    const { name, body, price, image, rating, category, brand, availability, fast_delivery } = req.body;

    if (!name || !body || !price || !image || !rating || !category || !brand) {
        return res.status(422).json({ message: "Please provide all details of the product" })
    }

    const product = new Product({
        name,
        body,
        price,
        image,
        rating,
        category,
        brand,
        availability,
        fast_delivery
    })
    product.save()
        .then(result => {
            res.json({ product: result })
        })
        .catch(err => {
            res.json({ error: err.message })
        })
}

const addwishlistController = (req, res) => {
    const { name, rating, price, image } = req.body;

    if (!name || !rating || !price || !image) {
        return res.json({ message: "Details are missing" })
    }

    const wishlist = new Wishlist({
        name,
        rating,
        price,
        image,
        postedBy: req.user
    })

    wishlist.save()
        .then(saved => {
            res.status(200).json({ saved })
        })
        .catch(err => {
            res.json({ error: err })
        })
}

const allproductController = (req, res) => {
    Product.find()
        .then(products => {
            res.json({ products })
        })
        .catch(err => {
            res.json({ error: err.message })
        })
}

export { addproductController, addwishlistController, allproductController };