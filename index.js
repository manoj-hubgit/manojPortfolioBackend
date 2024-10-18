import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
dotenv.config();


const app= express();
app.use(express.json());
app.use(cors(
    {
        origin:"*",
        methods:['GET','POST','PUT','DELETE'],
        credentials:true
    }
))

 const PORT=5000;


 const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/api/contact",async(req,res)=>{
    const {name,email,message} = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, 
        subject: `Contact Form Submission from ${name}`,
        text: message,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Error sending email." });
    }
})




app.get("/",(req,res)=>{
    res.send("App is runnng Successfully");
})

app.listen(PORT,()=>{
    console.log("App is running in the port");
})