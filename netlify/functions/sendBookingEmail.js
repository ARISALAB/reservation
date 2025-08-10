const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    // SMTP ρυθμίσεις για Gmail
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.pandrosougarden@gmail.com, // π.χ. pandrosougarden@gmail.com
        pass: process.env.kgzv vopa iaxy ksmc  // App password από Google
      }
    });

    // Μήνυμα email
    let mailOptions = {
      from: `"Pandrosou Garden" <${process.env.GMAIL_USER}>`,
      to: "pandrosougarden@gmail.com",
      subject: "Νέα Κράτηση",
      text: `
        Ονοματεπώνυμο: ${data.name}
        Τηλέφωνο: ${data.phone}
        Email: ${data.email}
        Ημερομηνία: ${data.date}
        Ώρα: ${data.time}
        Αριθμός Ατόμων: ${data.guests}
        Σχόλια: ${data.message}
      `
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Η κράτηση στάλθηκε" })
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Σφάλμα στην αποστολή email" };
  }
};
