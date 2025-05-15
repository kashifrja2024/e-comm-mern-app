require('dotenv').config();
const express = require("express");
const cors = require("cors")
require("./db/config");
const User = require("./db/User")
const Product = require("./db/Product");
const app = express();
const Jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 5000
// by using this key webtoken is generating
const jwtKey = 'e-com';





// ✅ Configure CORS properly
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
// }));
app.use(cors());
app.use(express.json()); // ← THIS LINE IS REQUIRED

// app.post("/register", async (req, resp) => {

//     const user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject();
//     delete result.password
//     Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {

//         if (err) {
//             resp.send("somthing went wrong , Please check the token")

//         }
//         resp.send({ result, auth: token })
//     })

// });

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;

        Jwt.sign({ user: result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                return resp.status(500).send("Something went wrong, please check the token");
            }
            resp.send({ result, auth: token });
        });
    } catch (error) {
        console.error("Register error:", error);
        resp.status(500).send({ result: "Internal server error" });
    }
});



// app.post('/login', async (req, resp) => {
//     console.log(req.body);
//     if (req.body.password && req.body.email) {
//         // to remove password from response  select("-password")
//         let user = await User.findOne(req.body).select("-password");
//         if (user) {
//             Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (error, token) => {
//                 if (error) {
//                     resp.send({ result: "Somthing went wrong" })
//                 }
//                 resp.send({ user, auth: token })

//             })

//         } else {
//             resp.send({ result: "no result found" })
//         }

//     } else {
//         resp.send({ result: "no result found" })
//     }

// })


// Chat gpt



app.post('/login', async (req, res) => {
    console.log("login called");

    const { email, password } = req.body;

    if (email && password) {
        try {
            const user = await User.findOne({ email, password }).select("-password");
            if (user) {
                Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {

                    if (err) {
                        res.send("somthing went wrong , Please check the token")

                    }
                    res.send({ user, auth: token })
                })
            } else {
                res.send("no user found")
            }

            // res.send({ user, auth: token });


        } catch (error) {
            console.error("Login error:", error);
            res.status(500).send({ result: "Internal server error" });
        }

    } else {
        res.status(400).send({ result: "Email and password are required" });
    }
});


app.post("/add-product", verification, async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.status(201).send(result);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(400).send({ error: "Bad Request", details: error.message });
    }
});


app.get("/product", verification, async (req, resp) => {
    console.log("port 5000");

    try {
        const result = await Product.find(); // Await the async call

        if (result) {
            resp.send(result);
        } else {
            resp.send({ result: "no result found" });
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

// app.delete("/product/:id", async (req, resp) => {
//     resp.send("deleting.. ")
//     const result = await Product.deleteOne({ _id: req.params.id });
//     resp.send(result)
// })

app.delete("/product/:id", verification, async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            return res.json({ success: true });
        } else {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});


// this function fill update preform data
// app.get("/product/:id", (req, resp) => {
//     const result = Product.findOne(result);

//     if (result) {
//         resp.send(result)
//     } else {
//         resp.send({ result: "result not found" })
//     }
// })

app.get("/product/:id", verification, async (req, resp) => {
    try {
        const result = await Product.findOne({ _id: req.params.id });

        if (result) {
            resp.send(result);
        } else {
            resp.status(404).send({ result: "Product not found" });
        }
    } catch (err) {
        console.error("Error fetching product:", err);
        resp.status(500).send({ result: "Server error" });
    }
});

// Update api

app.put("/product/:id", verification, async (req, resp) => {

    const result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "result not found" })
    }
})

app.get("/search/:key", verification, async (req, resp) => {

    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } }
        ]
    });
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "result not found" })
    }
})

// chat gpt code
// app.get("/searchess/:key", verification, async (req, res) => {
//     try {
//         const result = await Product.find({
//             $or: [
//                 { name: { $regex: req.params.key, $options: "i" } }, // case-insensitive
//                 { price: { $regex: req.params.key, $options: "i" } },
//                 { category: { $regex: req.params.key, $options: "i" } },
//                 { company: { $regex: req.params.key, $options: "i" } }
//             ]
//         });

//         if (result.length > 0) {
//             res.send(result);
//         } else {
//             res.status(404).send({ result: "No products found" });
//         }
//     } catch (error) {
//         console.error("Search error:", error);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// });

function verification(req, resp, next) {
    console.log("middleware call");
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(" ")[1];
        console.log({ toke: "middleware called" });
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please provide vailid token" })
            } else {
                next();

            }
        })


    } else {
        resp.status(403).send({ result: " Plz add the header" })
    }

}

// app.listen(PORT);
app.listen(5000, () => {
    console.log("server is running ");

});