const mongoose = require("mongoose")

const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URL)
    console.log("Đã kết nối đến mongoose")
}

module.exports = connectDatabase;