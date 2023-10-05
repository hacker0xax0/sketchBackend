import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: true,
      unique:[true,"Email Already exist"]
    },
    password: {
      type: String
    },
    tokens:[{
      token:{
        type:String,
        required:true
      }
    }],
    phone:{
      type:Number
    },
    address:{
      type:String
    },
    imageUrl:{
      type:String
    },
    pincode:{
      type:Number
    },
    createdAt: {type: Date, default: Date.now}
  }
);

userSchema.methods.generateAuthToken = async function(){
  try {
    const token = jwt.sign({_id:this._id.toString()},'hiiwearemesswalaprityshubhamakashanindita');
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  } catch (error) {
    res.status(400).send(error);
  }
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});


const Users = mongoose.model('Users', userSchema);
export { Users };