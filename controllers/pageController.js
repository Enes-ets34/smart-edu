const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log("req.session.userID :>> ", req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};
exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};
exports.getPricingPage = (req, res) => {
  res.status(200).render("pricing", {
    page_name: "pricing",
  });
};
exports.getTeachersPage = (req, res) => {
  res.status(200).render("teachers", {
    page_name: "teachers",
  });
};
exports.getCoursesPage = (req, res) => {
  res.status(200).render("courses", {
    page_name: "courses",
  });
};
exports.sendEmail = async (req, res) => {
  const outputMessage = `
 <h1>Mail Details</h1>
 <ul>
 <li>Name: ${req.body.name}</li>
 <li>Email: ${req.body.email}</li>
 <li>Phone: ${req.body.phone}</li>
 </ul>
 <h1>Message</h1>
 <p>
 ${req.body.message}
 </p>
 `;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "ets.34.es@gmail.com", // gmail account
      pass: process.env.PASSWORD, // gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart Edu" <ets.34.es@gmail.com>', // sender address
    to: "<ets.34.es@gmail.com>", // list of receivers
    subject: "Smart EDU Contact Form New Message ✔", // Subject line

    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(200).redirect("contact");
};
