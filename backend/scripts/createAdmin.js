import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL;
    const plainPassword = process.env.ADMIN_PASSWORD;

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully");
    console.log("Email:", email);
    console.log("Password:", plainPassword);

    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
};

createAdmin();
