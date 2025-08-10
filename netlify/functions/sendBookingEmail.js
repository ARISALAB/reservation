const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // από Netlify Environment Variables
        pass: process.env.GMAIL_PASS  // App Password από Google
      }
    });

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
    console.error("Email sending error:", error);
    return { statusCode: 500, body: "Σφάλμα στην αποστολή email" };
  }
};
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Σφάλμα στην αποστολή email" };
  }
};
