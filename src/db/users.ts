import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, require: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model('User', UserSchema);

export function getUsers() {
  return UserModel.find();
}

export function getUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function getUserBySessionToken(sessionToken: string) {
  return UserModel.findOne({ 'authentication.sessionToken': sessionToken });
}

export function getUserById(id: string) {
  return UserModel.findById(id);
}

export function createUser(values: Record<string, any>) {
  return new UserModel(values).save().then((user) => user.toObject());
}

export function deleteUserById(id: string) {
  return UserModel.findOneAndDelete({ _id: id });
}

export function updateUserById(id: string, values: Record<string, any>) {
  return UserModel.findByIdAndUpdate(id, values);
}
