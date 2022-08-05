const {Schema, model} = require("mongoose")


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      enum: ["Admin", "User"],
      required:true
    },
    total:{
      type:Number,
      default:0,
      required:false
    },
    expectedcalorie:{
      type:Number,
      default:2100,
      required:false
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("users", userSchema);
