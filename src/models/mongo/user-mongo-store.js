/**
 * User Mongo Store model handling User related data.
 *
 * @author Fiona Waters
 * @date 05/06/2022
 * @version 4
 */
import bcrypt from "bcrypt";
import sanitizeHtml from "sanitize-html";
import { User } from "./user.js";

const saltRounds = 10;

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateUser(userid, updatedUser) {
    const user = await User.findOne({ _id: userid });
    user.firstName = sanitizeHtml(updatedUser.firstName);
    user.lastName = sanitizeHtml(updatedUser.lastName);
    user.email = sanitizeHtml(updatedUser.email);
    user.password = await bcrypt.hash(updatedUser.password, saltRounds);
    await user.save();
    const savedUser = await User.findOne({ "_id": userid}).lean();
    return savedUser;
  },
};
