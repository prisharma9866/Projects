const mongoose = require("mongoose");
 const EmployeeSchema = new mongoose.Schema({
    fullName: String,
    lastName:String,
    email: String,
    Password: String,
    phone: Number,
 })

 const EmployeeModel = mongoose.model("employees", EmployeeSchema);

 module.exports = EmployeeModel;