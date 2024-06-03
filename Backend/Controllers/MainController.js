const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/Nodemailer");
const Post = require("../Model/PostSchema");
const otpModel = require("../Model/OtpModel");
const XLSX = require("xlsx");
const OtpModel = require("../Model/OtpModel");

const otpStore = {};

module.exports = {
  //user registration (POST api)

  createUser: async (req, res) => {
    const { name, email, mobile, password } = req.body;

    await User.create({
      name: name,
      email: email,
      password: password,
      mobile: mobile,
    });
    res.status(201).json({
      status: "success",
      message: "user registration successfull.",
    });
  },

  //user Login (POST api /users/login)

  userLongin: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    console.log(user, "222");
    const id = user.id;
    console.log(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    if (!password || !user.password) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid input" });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    console.log(checkPass);
    if (!checkPass) {
      return res
        .status(400)
        .json({ status: "error", message: "password incorrect" });
    }
    const token = jwt.sign(
      { email: user.email },

      process.env.USER_ACCESS_TOKEN_SECRET,
      {
        expiresIn: 86400,
      }
    );
    console.log(token);
    res
      .status(200)
      .json({
        status: "success",
        message: "Login successful",
        data: token,
        email,
        id,
      });
  },

  ForgotPasswordOtp: async (req, res) => {
    const { email } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const Model = await otpModel.create({
      email: email,
      otp: otp,
    });
    console.log(Model);

    if (Model) {
      res.status(201).json({ status: "success" });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ status: "error", message: "Failed to send OTP" });
      }
      res
        .status(200)
        .json({ status: "success", message: "OTP sent successfully" });
    });
  },

  resetPassword: async (req, res) => {
    const { email } = req.body;
    const { otp, newPassword } = req.body;

    if (otpStore[email] !== otp) {
      return res.status(400).json({ status: "error", message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    delete otpStore[email];

    res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  },

  submitOtp: async (req, res) => {
    const { otp, email, newPassword } = req.body;
    console.log(req.body);
    if (otp === null) {
      res.status(401).json({ status: "failed", message: "Otp required" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const otpValue = await otpModel.updateOne(
      { email },
      { password: hashedPassword }
    );
    console.log(otpValue, "llllll");
    if (otpValue.otp === otp) {
      res.status(200).json({ status: "success", message: "Success" });
    }
    res.status(201).json({ status: "failed", message: "Invalid Otp" });
  },

  createPost: async (req, res) => {
    const { description, image } = req.body;
    console.log(req.body);

    await Post.create({
      description,
      image,
    });

    res.status(201).json({
      status: "success",
      message: "Post successfully created",
    });
  },

  getAllPost: async (req, res) => {
    const post = await Post.find();
    res
      .status(200)
      .json({
        status: "success",
        message: "successfully fetced post",
        data: post,
      });
  },

  editProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const Updatedproduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json({
        status: "success",
        message: "updated product",
        data: Updatedproduct,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.status(201).json({
        status: "success",
        message: "deletes successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },

  BulkMail: async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    try {
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const emailData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      console.log(emailData);
      const emailList = emailData
        .flat()
        .filter((email) => validateEmail(email));
      console.log(emailList);

      if (emailList.length === 0) {
        return res.status(400).send("No valid email addresses found");
      }

      for (const email of emailList) {
        const mailOptions = {
          from: process.env.EMAIL,
          subject: "Bulk Email Subject",
          text: `Dear ${email},
            Your data has been successfully added in our database
      `,
        };
        await transporter.sendMail({ ...mailOptions, to: email });
      }

      res.status(200).send("Emails sent successfully");
    } catch (error) {
      console.error("Error processing file or sending emails:", error);
      res.status(500).send("Error processing file or sending emails");
    }
  },
};