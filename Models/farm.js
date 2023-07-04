const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then(() => console.log("Mongo Connection Open!!"))
  .catch((err) => {
    console.log("Oh No Mongo Connection Error!");
    console.log(err);
  });

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

Product.insertMany([
  { name: "Goddes Melon", price: 4.99, season: "Summer" },
  { name: "Sugger Baby Watermelon", price: 4.99, season: "Summer" },
  { name: "Asparagus", price: 3.99, season: "Spring" },
]);

const makeFarm = async () => {
  const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
  const melon = await Product.findOne({ name: "Goddes Melon" });

  farm.products.push(melon);
  await farm.save();
  console.log(farm);
};

const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  const waterMelon = await Product.findOne({ name: "Sugger Baby Watermelon" });

  farm.products.push(waterMelon);
  await farm.save();
  console.log(farm);
};

addProduct();
