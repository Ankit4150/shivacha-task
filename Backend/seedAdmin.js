require('dotenv').config();
const mongoose = require('mongoose');
const admin = require('../backend/models/adminModel');
const connectDB = require('../backend/dbConfig/connectDB');
const {hashPassword} = require('../backend/utils/passwordHashing')

const seed = async () => {
  connectDB();
//   const existing = await admin.findOne({ email: process.env.ADMIN_EMAIL });
//   if (existing) { console.log('Admin already exists'); process.exit(); }

  const password = await hashPassword("12345678")

  await admin.create({
     name: "admin",
     username: "admin@gmail.com", 
     password: password, 
    });

  console.log('Admin seeded:', "lallan@gmail.com");
  process.exit();
};

seed().catch(console.error);