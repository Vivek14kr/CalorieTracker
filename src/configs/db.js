const mongoose = require("mongoose")

module.exports= ()=>{
   return mongoose.connect(
     "mongodb+srv://Vivek13kr:gLbNBFhCZceN1FCZ@cluster0.koybuhb.mongodb.net/calorietracker"
   );
}