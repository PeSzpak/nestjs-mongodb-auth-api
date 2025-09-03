import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UsersSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    
    if (typeof this.password === 'string') {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    return next(err);
  }
});

