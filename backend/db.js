const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://<username>:<password>@cluster0.oiguh.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (error, result) => {
      if (error) console.log("---", error);
      else {
        console.log("Connected Successfully!");
        const fetched_data = await mongoose.connection.db.collection("foodItems")
        fetched_data.find({}).toArray(async function(error, data){
          const foodCategory = await mongoose.connection.db.collection("foodCategory")
          foodCategory.find({}).toArray(function(error, categoryData){
            if (error) console.log(error);
            else {
              global.foodItems = data;
              global.foodCategory = categoryData;
            }
          })
        })
      }
    });
}

module.exports = connectToMongoDB;