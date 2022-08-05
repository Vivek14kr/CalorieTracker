const Calorie = require("../models/calorie.model");
const User = require("../models/user.model");
const express = require("express");
const router = express.Router();

//Admin can make a single get request and he can see all the users with their food eating schedules and calories

router.get("/", async (req, res) => {
  try {
    const calorie = await Calorie.find({}).populate("user_id");

    return res.status(200).json(calorie);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});

//Admin can see all users separately also 

router.get("/allusers", async (req, res) => {
  try {
    const user = await User.find({});

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});

//Admin can make changes in any of the calories of product consume by user and effect will also be shown on the total calorie consumed by User you can see the effect by making 
//a get request to allusers and see on total of that particular user who has consumed that food item.

router.put("/reducecalorie/:calorie_id", async (req, res) => {
  try {
    const caloriee = await Calorie.findOne({
      _id: req.params.calorie_id,
    }).populate("user_id");

    let calval = caloriee.calorie;

    const finduser = await User.find({ _id: caloriee.user_id._id });
    let cost;


    cost = req.body.calorie - calval;


    let newval = finduser[0].total + cost;
 
    const user = await User.findOneAndUpdate(
      { _id: caloriee.user_id._id },
      { $set: { total: newval } },
      { new: true }
    );

    const calory = await Calorie.findOneAndUpdate(
      { _id: req.params.calorie_id },
      { $set: { calorie: req.body.calorie } },
      { new: true }
    );

    return res.status(200).json(calory);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});


//Admin can delete fooditems consumed by a specific user and effect can be shown on the final total calories under user model by making a allusers get request and the particular food item entry has 
//also been deleted

router.delete("/deletecalorie/:calorie_id/:user_id", async (req, res) => {
  try {
    const calorie = await Calorie.find({
      _id: req.params.calorie_id,
    }).populate("user_id");
  
    const finduser = await User.find({ _id: calorie[0].user_id._id });
    
    let amount = calorie[0].calorie;
    let usercal = finduser[0].total;
   
    let newtotal = Number(usercal) - Number(amount);
  
    const user = await User.findOneAndUpdate(
      { _id: req.params.user_id },
      { $set: { total: newtotal } },
      { new: true }
    );
    await Calorie.findByIdAndDelete(req.params.calorie_id);
    return res.status(200).json("Deleted successfully");
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});

//Admin can make a food items consumption entry for a specifc user

router.post("addcalorie/:user_id", async (req, res) => {
  try {
    const calorieuser = await User.find({ _id: req.body.user_id })
      .lean()
      .exec();

    let totall = calorieuser[0].total;

    var today = new Date();

    let year = today.getFullYear();
    let month = +(today.getMonth() + 1);
    let monthstr = month.toString();
    if (monthstr.length == 1) {
      monthstr = "0" + monthstr;
    }

    let todaydate = today.getDate();
    let datestr = todaydate.toString();
    if (datestr.length == 1) {
      datestr = "0" + datestr;
    }
    var date = year + "-" + monthstr + "-" + datestr;

    let usercalorielimit = await User.findOne({ _id: req.body.user_id });

    if (req.body.date == date) {
      if (totall >= usercalorielimit.expectedcalorie) {
        return res.status(404).json("You have reached the limit");
      }
    }

    let userupdate = await User.findOneAndUpdate(
      { _id: req.body.user_id },
      { $set: { total: totall + req.body.calorie } },
      { new: true }
    );

    const calorie = await Calorie.create(req.body);

    return res.status(200).json(calorie);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});

module.exports = router;
