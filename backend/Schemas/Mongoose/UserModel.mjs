import mongoose, {Schema} from "mongoose";

const User = new Schema({   
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const userModel = mongoose.model("user", User);
export default userModel