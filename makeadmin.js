const User = require("./models/User");
const bcrypt = require("bcrypt");

async function makeAdmin() {
  try {
    let user = await User.findOne({ email: "cs11babu@gmail.com" });
    if (user) {
      console.log("user updated .....");
    } else {
      let user = new User();
      user.firstName = "chandan";
      user.lastName = "Babu";
      user.email = "cs11babu@gmail.com";
      let encryptredPassword = bcrypt.hashSync("chandan12", 10);
      user.password = encryptredPassword;
      user.userType = "Admin";
      await user.save();
      console.log("User save successfully...");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = makeAdmin;
