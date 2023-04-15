const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://<username>:<password>@cluster0.oiguh.mongodb.net/?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, (error, result) => {
      if (error) console.log("---", error);
      else {
        console.log("Connected Successfully!");
      }
    });
}

module.exports = connectToMongoDB;