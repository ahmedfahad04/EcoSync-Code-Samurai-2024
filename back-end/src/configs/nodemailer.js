"use strict";
import { config } from "./config.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.nodemailer.user,
        pass: config.nodemailer.password,
    },
});
const systemEmail = config.nodemailer.user;

const getSignature = () => {
    const signature = `
    <p> 
        Best Regards, <br>
        Wste Management <br>
        Dhaka North City Corporation
    </p>`;
    return signature;
};

export const sendEmailWithOTP = async (receiverEmail, otp) => {
    const html =
        `<p>Dear user,</p>

    <p>I hope this email finds you well. We are reaching out to you to complete the reset password 
    process for your DNCC account. To proceed, we kindly request that 
    you use the following One-Time Password (OTP):</p>

    <p><strong>OTP:</strong> ${otp}</p>

    <p>Please note that the OTP is valid for 5 minutes. If it expires before you have 
    a chance to use it, you can request a new OTP by following the "Reset Password" process on our website. </p>

    <p>Link of our website: <a href="www.google.com">click</a></p>

    <p>If you have any questions or concerns, please don't hesitate to reach out to us.</p>` + getSignature();

    const mailOptions = {
        from: systemEmail,
        to: receiverEmail,
        subject: "One-Time Password (OTP) for Password Reset",
        html: html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email with otp sent successfully");
    } catch (err) {
        console.log("Error sending email with OTP: ", err);
        throw new Error(err);
    }
};
