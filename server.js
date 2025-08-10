// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
// Συνάρτηση για ανάγνωση των κρατήσεων από το αρχείο
const readReservations = () => {
    try {
        if (!fs.existsSync(DB_PATH)) {
            return [];
        }
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Σφάλμα κατά την ανάγνωση του αρχείου βάσης δεδομένων:', error);
        return [];
    }
};

// Συνάρτηση για εγγραφή κρατήσεων στο αρχείο
const writeReservations = (reservations) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(reservations, null, 2), 'utf8');
    } catch (error) {
        console.error('Σφάλμα κατά την εγγραφή στο αρχείο βάσης δεδομένων:', error);
    }
};

// API Endpoint για την ανάκτηση όλων των κρατήσεων
app.get('/api/reservations', (req, res) => {
    const reservations = readReservations();
    res.json(reservations);
});

// API Endpoint για την προσθήκη νέας κράτησης
app.post('/api/reservations', (req, res) => {
    const newReservation = req.body;
    const reservations = readReservations();
    reservations.push(newReservation);
    writeReservations(reservations);
    res.status(201).json({ message: 'Η κράτηση προστέθηκε επιτυχώς!' });
});

app.listen(PORT, () => {
    console.log(`Ο Server τρέχει στη διεύθυνση http://localhost:${PORT}`);

});
