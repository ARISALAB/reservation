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
      subject: `New Reservation from ${data.name}`,
      html: `
        <h3>Reservation Details</h3>
        <ul>
          <li><strong>Full Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Date:</strong> ${data.date}</li>
          <li><strong>Time:</strong> ${data.time}</li>
          <li><strong>Number of People:</strong> ${data.guests}</li>
          <li><strong>Comments:</strong> ${data.message}</li>
        </ul>
      `
    };

    await transporter.sendMail(mailOptionsToRestaurant);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Reservation sent successfully!" })
    };

  } catch (error) {
    console.error("Email sending error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending email" })
    };
  }
};
      body: JSON.stringify({ message: "Reservation sent successfully!" })
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending email" })
    };
  }
};      body: JSON.stringify({ message: "Reservation sent successfully!" })
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending email" })
    };
  }
}; // This is the final closing brace for the exports.handler function
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
