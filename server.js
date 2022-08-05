// gLbNBFhCZceN1FCZ;
//Vivek13kr
// gLbNBFhCZceN1FCZ;

const connect = require("./src/configs/db")

const app = require("./index")

const PORT = 4300;

app.listen(PORT, async (req, res)=>{
  await connect()
  console.log("PORT is RUnning")
})