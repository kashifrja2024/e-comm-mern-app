const mongoose = require("mongoose");
// Schemas define the  structure of documents within a collection
const productSchema = new mongoose.Schema({

    name: String,
    price: String,
    category: String,
    userId: String,
    company: String
});
// model is wraper around the schema that allow us to intract with the mongo db database
module.exports = mongoose.model("products", productSchema);

