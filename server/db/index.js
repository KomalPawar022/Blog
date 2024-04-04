const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://KomalPawar:mongoPassword@atlascluster.utzf9ud.mongodb.net/",
  )
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log(err));
