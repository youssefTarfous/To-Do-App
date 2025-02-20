import mongoose from "mongoose";
const ConnectToMongoDb = async () => {
  mongoose
    .connect("mongodb://localhost:27017/tasks")
    .then(() => {
      console.log(`Connected to The MongoDb Database`);
    })
    .catch((err) => console.error(err));
};
export default ConnectToMongoDb;
