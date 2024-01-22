const UserData = require("../models/user");
const productData = require("../models/productSchema");
const bcrypt = require("bcrypt");
let message = "";

let obj3 = {
  slashlogin: (req, res) => {
    if (req.session.fname) {
      res.redirect("/users/userHome");
    } else if (req.session.userId && req.session.isAdmin) {
      res.redirect("/admin/ahome");
    }
    res.redirect("/login");
  },
  loginRouter: (req, res) => {
    if (req.session.fname) {
      res.redirect("/users/userHome");
    } else if (req.session.userId && req.session.isAdmin)
      res.redirect("/admin/ahome");
    res.render("login", { message: message });
    message = "";
  },
  postLogin: async (req, res) => {
    try {
      const { fname, pswrd } = req.body;
      const user = await UserData.findOne({ name: fname });
      if (!user) {
        message = `User does not exist, please signup`;
        return res.redirect("/login");
      }

      const isPasswordValid = bcrypt.compareSync(pswrd, user.password);
      if (!isPasswordValid) {
        message = "Invalid password";
        return res.redirect("/login");
      } else {
        req.session.userId = user._id;
        if (user.role === "admin") {
          req.session.isAdmin = true;
          res.redirect("/admin/ahome");
        } else if (user.role === "user") {
          req.session.fname = fname;
          res.redirect("/users/userHome");
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  signupRouter: (req, res) => {
    if (req.session.fname) {
      res.redirect("/users/userHome");
    } else {
      res.render("signup", { message: message });
      message = "";
    }
  },
  postSignup: async (req, res, next) => {
    try {
      const { fname, mail, pswrd } = req.body;

      const existUser = await UserData.findOne({ email: mail });

      if (existUser) {
        message = `there is already a user with ${mail},please login`;
        res.redirect("/signup");
      } else {
        const hashedpass = bcrypt.hashSync(pswrd, bcrypt.genSaltSync(10));
        const newUser = new UserData({
          name: fname,
          email: mail,
          password: hashedpass,
        });

        await newUser.save();
        req.session.userId = newUser._id;
        res.redirect("/users/userHome");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = obj3;


