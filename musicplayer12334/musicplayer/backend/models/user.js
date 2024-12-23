// const mongoose = require("mongoose");

// const UserSchema = mongoose.Schema({
//     name : {
//         type : String,
//         required : true,
//     },
//     email : {
//         type : String,
//         required : true,
//     },
//     imageURL : {
//         type : String,
//         required : true,
//     },
//     user_id : {
//         type : String,
//         required : true,
//     },
//     email_verfied : {
//         type : Boolean,
//         required : true,
//     },
//     role : {
//         type : String,
//         required : true,
//     },
//     auth_time : {
//         type : String,
//         required : true,
//     },

// },
// {timestamps : true}
// );

// module.exports = mongoose.model("user", UserSchema);

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['admin', 'member'],  // Các giá trị hợp lệ cho role
//     default: 'member'           // Giá trị mặc định
//   },
//   favourites: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'member'],  // Các giá trị hợp lệ
    default: 'user',
  },
  user_id: {
    type: String,  // Nếu bạn muốn sử dụng user_id là String
    required: true,
    unique: true,  // Đảm bảo mỗi user có một user_id duy nhất
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
