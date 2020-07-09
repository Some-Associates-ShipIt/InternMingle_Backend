const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password:{type:String, require:true},
    displayName:{type:String},
});

module.exports= User = mongoose.model("user", userSchema);