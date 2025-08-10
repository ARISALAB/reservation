const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    // Δημιουργία transporter για την αποστολή email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Από Netlify Environment Variables
        pass: process.env.GMAIL_PASS  // Κωδικός εφαρμογής (App Password)
      }
    });

    // Email προς το κατάστημα
    const mailOptionsToRestaurant = {
      from: `"Σύστημα Κρατήσεων" <${process.env.GMAIL_USER}>`,
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

    // Αποστολή του email στο κατάστημα
    await transporter.sendMail(mailOptionsToRestaurant);

    // Εδώ μπορείς να προσθέσεις κώδικα για το email επιβεβαίωσης προς τον πελάτη αν θέλεις

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
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Σφάλμα στην αποστολή email" };
  }
};
