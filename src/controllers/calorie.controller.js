const express = require("express");

const Calorie = require("../models/calorie.model");
const User = require("../models/user.model");

const router = express.Router();

//User can make a post request and start consuming products calorie tracker will track the amount by calories consumed by user

router.post("/", async (req, res) => {
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

//User can see everyone food items consumption

router.get("/", async (req, res) => {
  try {
    const calorie = await Calorie.find({});
    return res.status(200).json(calorie);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});

//user can see food consumed particulary by him by making a get req and using his id.
router.get("/seefooditems/:user_id", async (req, res) => {
  try {
 
    const calorie = await Calorie.find({ user_id: req.params.user_id })
      .select({ food: 1, _id: 0 })
      .lean()
      .exec();

    return res.status(200).json(calorie);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});
module.exports = router;
