const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptionsToRestaurant = {
      from: `"Pandrosou Garden" <${process.env.GMAIL_USER}>`,
      to: "pandrosougarden@gmail.com",
      subject: `Νέα Κράτηση από τον/την ${data.name}`,
      html: `
        <h3>Στοιχεία Κράτησης</h3>
        <ul>
            <li><strong>Ονοματεπώνυμο:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Τηλέφωνο:</strong> ${data.phone}</li>
            <li><strong>Ημερομηνία:</strong> ${data.date}</li>
            <li><strong>Ώρα:</strong> ${data.time}</li>
            <li><strong>Αριθμός Ατόμων:</strong> ${data.guests}</li>
            <li><strong>Σχόλια:</strong> ${data.message}</li>
        </ul>
      `
    };

    await transporter.sendMail(mailOptionsToRestaurant);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Η κράτηση στάλθηκε επιτυχώς!" })
    };
  } catch (error) {
    console.error("Σφάλμα στην αποστολή email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Σφάλμα στην αποστολή email" })
    };
  }
};    console.error("Email sending error:", error);
    return { statusCode: 500, body: "Σφάλμα στην αποστολή email" };
  }
};
