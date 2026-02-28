import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create email transporter
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com", // Replace with your email
    pass: process.env.EMAIL_PASS || "your-app-password", // Replace with your app password
  },
});

// Email template
const createEmailTemplate = (formData, isQualified) => {
  const emailContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 New Job Application</h1>
            <p>${isQualified ? "Qualified Application" : "Application Without Qualifications"}</p>
          </div>
          <div class="content">
            <h2>👤 Personal Information</h2>
            <div class="field">
              <span class="label">Name:</span> 
              <span class="value">${formData.name}</span>
            </div>
            <div class="field">
              <span class="label">Birthdate:</span> 
              <span class="value">${formData.birthdate}</span>
            </div>
            <div class="field">
              <span class="label">Marital Status:</span> 
              <span class="value">${formData.maritalStatus}</span>
            </div>
            <div class="field">
              <span class="label">Place of Residence:</span> 
              <span class="value">${formData.placeOfResidence}</span>
            </div>
            <div class="field">
              <span class="label">Current Job:</span> 
              <span class="value">${formData.currentJob}</span>
            </div>
            <div class="field">
              <span class="label">Driving License:</span> 
              <span class="value">${formData.hasDrivingLicense === "true" ? `Yes (${formData.licenseType})` : "No"}</span>
            </div>

            <h2>📞 Contact Information</h2>
            <div class="field">
              <span class="label">Phone:</span> 
              <span class="value">${formData.phone}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span> 
              <span class="value">${formData.email}</span>
            </div>

            <h2>🎓 Education</h2>
            <div class="field">
              <span class="label">Education Level:</span> 
              <span class="value">${formData.educationLevel}</span>
            </div>
            <div class="field">
              <span class="label">School/University:</span> 
              <span class="value">${formData.schoolName}</span>
            </div>
            <div class="field">
              <span class="label">Specialization:</span> 
              <span class="value">${formData.specialization}</span>
            </div>
            <div class="field">
              <span class="label">Graduation Year:</span> 
              <span class="value">${formData.graduationYear}</span>
            </div>
            <div class="field">
              <span class="label">Grade:</span> 
              <span class="value">${formData.grade}</span>
            </div>

            ${
              isQualified && formData.higherDegree
                ? `
            <h2>📚 Higher Education</h2>
            <div class="field">
              <span class="label">Higher Degree:</span> 
              <span class="value">${formData.higherDegree}</span>
            </div>
            <div class="field">
              <span class="label">Degree Place:</span> 
              <span class="value">${formData.degreePlace}</span>
            </div>
            <div class="field">
              <span class="label">Degree Specialization:</span> 
              <span class="value">${formData.degreeSpecialization}</span>
            </div>
            <div class="field">
              <span class="label">Degree Year:</span> 
              <span class="value">${formData.degreeYear}</span>
            </div>
            <div class="field">
              <span class="label">Degree Grade:</span> 
              <span class="value">${formData.degreeGrade}</span>
            </div>
            `
                : ""
            }
          </div>
          <div class="footer">
            <p>This application was submitted on ${new Date().toLocaleString()}</p>
            <p>Job ID: ${formData.jobId || "N/A"}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return {
    subject: `New Job Application - ${formData.name} (${isQualified ? "Qualified" : "Without Qualifications"})`,
    html: emailContent,
  };
};

// Application submission endpoint
app.post("/api/jobs/:id/apply", upload.single("cv"), async (req, res) => {
  try {
    const { id } = req.params;
    const formData = { ...req.body, jobId: id };
    const isQualified = formData.isQualified === "true";

    // Create email template
    const { subject, html } = createEmailTemplate(formData, isQualified);

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com", // Replace with your email
      to: process.env.HR_EMAIL || "hr@yourcompany.com", // Replace with HR email
      subject: subject,
      html: html,
      attachments: [],
    };

    // Add CV attachment if exists and user is qualified
    if (req.file && isQualified) {
      mailOptions.attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
      });
    }

    // Send email
    await transporter.sendMail(mailOptions);

    // Also send confirmation email to applicant
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com", // Replace with your email
      to: formData.email,
      subject: "Application Received - Confirmation",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
                <h1>✅ Application Received!</h1>
              </div>
              <div style="padding: 20px; background: #f9f9f9;">
                <p>Dear ${formData.name},</p>
                <p>Thank you for your interest in the position. We have successfully received your application.</p>
                <p><strong>Application Details:</strong></p>
                <ul>
                  <li>Name: ${formData.name}</li>
                  <li>Email: ${formData.email}</li>
                  <li>Phone: ${formData.phone}</li>
                  <li>Position: Job ID ${id}</li>
                  <li>Type: ${isQualified ? "Qualified Application" : "Application Without Qualifications"}</li>
                </ul>
                <p>Our team will review your application and contact you if your qualifications match our requirements.</p>
                <p>Best regards,<br/>HR Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Email service is configured and ready`);
});
