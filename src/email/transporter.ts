import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.mail_host,
  port: 465,
  secure: true,
  auth: {
    user: process.env.mail_user,
    pass: process.env.mail_password,
  },
});
