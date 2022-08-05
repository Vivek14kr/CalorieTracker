const express = require("express")

const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
const AdminController = require("./src/controllers/admin.controller")
const CalorieController = require("./src/controllers/calorie.controller")
const UserController = require("./src/controllers/user.controller")
app.get("/", (req, res)=>{
    res.send("Hello")
})

app.use("/admin", AdminController)
app.use("/users", UserController)
app.use("/calorie", CalorieController)

module.exports = app