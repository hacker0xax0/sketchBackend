import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: true
    },
    number:{
      type:Number
    },
    message:{
        type:String
    }
  },
  { timestamp: true }
);

const NewsLetter = mongoose.model('NewsLetter', newsletterSchema);
export {NewsLetter};