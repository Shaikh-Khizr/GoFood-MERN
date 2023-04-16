const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://<username>:<password>@cluster0.oiguh.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (error, result) => {
      if (error) console.log("---", error);
      else {
        console.log("Connected Successfully!");
        const fetched_data = await mongoose.connection.db.collection("foodItems")
        fetched_data.find({}).toArray(function(error, data){
          if (error) console.log(error);
          else {
            // console.log(data);
          }
        })
      }
    });
}

module.exports = connectToMongoDB;