const express = require("express");

const User = require("../models/user.model");

const router = express.Router();


//user can make a post request every user should be unique



router.post("/",  async (req, res) => {
  try {
    const findUser = await User.find({ username: req.body.username });
   
    if (findUser.length > 0) {
      return res
        .status(404)
        .json({
          status: "failed",
          message: "User already exist try different name",
        });
    }
    const user = await User.create(req.body);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});


router.get("/:user_id", async (req, res) => {
 try {

   const calorie = await User.find({ _id: req.params.user_id })
     .lean()
     .exec();

   return res.status(200).json(calorie);
 } catch (error) {
   return res.status(404).json({ status: "failed", message: error.message });
 }
});


//User can change his expected calroie as per his convinince by making a put req
router.put("/reducetotal/:user_id", async (req, res) => {
  try {

    const user = await User.findOneAndUpdate(
      { _id: req.params.user_id },
      { $set: { expectedcalorie: req.body.expectedcalorie } },
      { new: true }
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ status: "failed", message: error.message });
  }
});

module.exports = router;
