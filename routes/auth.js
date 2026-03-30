import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/Users.js";
// import dotenv from "dotenv";
const router = express.Router();
// dotenv.config();

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      parentPhone,
      governorate,
      grade,
      gender,
      email,
      password,
      confirmPassword,
    } = req.body;

    console.log(req.body)

    // تحقق من وجود المستخدم
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
    }

    // تحقق من مطابقة كلمة السر
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "كلمة المرور وتأكيدها غير متطابقين" });
    }

    // تشفير الباسورد
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // إنشاء المستخدم الجديد
    const newUser = new User({
      firstName,
      lastName,
      phone,
      parentPhone,
      governorate,
      grade,
      gender,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "رقم الهاتف أو كلمة المرور غير صحيحة" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "رقم الهاتف أو كلمة المرور غير صحيحة" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: "تم تسجيل الدخول بنجاح",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "حدث خطأ في السيرفر" });
  }
});

export default router;
