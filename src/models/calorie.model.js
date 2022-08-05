

const { Schema, model } = require("mongoose");

const calorieSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    date: [
      {
        type: Date,
        required: true,
      },
    ],
    food: [
      {
        type: String,
        required: true,
      },
    ],
    calorie:  {
        type: Number,
        required: true,
      },
    
 
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("calorie", calorieSchema);
