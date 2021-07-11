import Cart from "../Model/Cart.js";


const mycartController = (req, res) => {
    Cart.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(product => {
            return res.json({ list: product })

            // return res.json({ message: req.user })
        })
        .catch(err => {
            return res.json({ error: err })
        })
}

const addcartController = (req, res) => {
    const { name, rating, price, image } = req.body;

    if (!name || !rating || !price || !image) {
        return res.status(422).json({ message: "Please fill all the fields" })
    }

    const cart = new Cart({
        name,
        rating,
        price,
        image,
        postedBy: req.user
    })

    cart.save()
        .then((result) => {
            res.json({ result })
        })
        .catch(err => {
            res.json({ error: err.message })
        })
}

const incrementerController = (req, res) => {
    Cart.findByIdAndUpdate(req.body.cartid, {
        $inc: { quantity: 1 }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.json({ error: err })
        } else {
            return res.json({ result })
        }
    })
}

const decrementController = (req, res) => {
    Cart.findByIdAndUpdate(req.body.cartid, {
        $inc: { quantity: -1 }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.json({ error: err })
        } else {
            return res.json({ result })
        }
    })
}

const removeController = (req, res) => {
    Cart.findById(req.body.cartid)

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
}

export { mycartController, addcartController, incrementerController, decrementController, removeController };