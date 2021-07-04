import express from "express"
const router = express.Router();
import requireLogin from "../middleware/requireLogin.js";
import Wishlist from "../Model/Wishlist.js";

router.post("/addwishlist", requireLogin, (req, res) => {

    const { name, rating, price, image } = req.body;

    if (!name || !rating || !price || !image) {
        return res.status(422).json({ message: "Please fill all the fields" })
    }

    const wishlist = new Wishlist({
        name,
        rating,
        price,
        image,
        postedBy: req.user
    })

    wishlist.save()
        .then((result) => {
            res.json({ result })
        })
        .catch(err => {
            res.json({ error: err.message })
        })
})

router.get("/mywishlist", requireLogin, (req, res) => {

    Wishlist.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(saved => {
            res.json({ saved })
        })
        .catch(err => {
            res.json({ error: err })
        })
})


router.put("/removewishlist", (req, res) => {

    Wishlist.findById(req.body.cartid)

    .then(found => {

        if (!found) {
            return res.status(422).json({ message: "This post does not exist" });
        }

        found.remove()
            .then((result) => {
                return res.json({ result })
            })
            .catch(err => {
                return res.json({ error: err })
            })
    })
})




export default router;