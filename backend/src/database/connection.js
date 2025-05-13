const mongoose = require("mongoose");

module.exports = async () => {
    try {
        console.log("Connecting db...");
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("Database Connected  🟢🚀 !");
    } catch (err) {
        console.log("Database connection ERROR 🔴🔥 !");
        console.log(err);
    }
};
