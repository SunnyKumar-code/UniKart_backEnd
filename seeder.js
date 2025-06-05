const Product =require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config();

//Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

//Function to seed data

const seedData= async()=>{
    try{

        //Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
         await Cart.deleteMany();
        //Create a default admin User
        const createdUser = await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:"123456",
            role:"admin"
        })

        //Assign the default user ID to each product
        const userID = createdUser._id;

        const sampleProduct = products.map((product)=>{
            return {...product,user:userID}
        })
        //Insert the product into the database
        await Product.insertMany(sampleProduct)
        console.log("Product data seeding successfully");
        process.exit();
        

    }catch(error){
        console.error("Error seeding the data :",error);
        process.exit(1)
    }
}
seedData()