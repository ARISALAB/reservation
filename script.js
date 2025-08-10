document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('reservationForm')) {
        const translations = {
            el: {
                language_label: 'Γλώσσα:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Καλώς ορίσατε',
                welcome_tagline: 'Ένα ταξίδι γεύσεων σας περιμένει.',
                form_name_label: 'Ονοματεπώνυμο:',
                form_phone_label: 'Τηλέφωνο:',
                form_email_label: 'Email:',
                form_date_label: 'Ημερομηνία:',
                form_time_label: 'Ώρα:',
                form_guests_label: 'Αριθμός Ατόμων:',
                submit_button_text: 'Υποβολή Κράτησης',
                confirmation_message_text: 'Σας ευχαριστούμε! Η κράτησή σας καταχωρήθηκε επιτυχώς.',
                reservation_summary_title: 'Σύνοψη Κράτησης',
                summary_name: 'Ονοματεπώνυμο:',
                summary_date: 'Ημερομηνία:',
                summary_time: 'Ώρα:',
                summary_guests: 'Αριθμός Ατόμων:',
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Παρακαλώ συμπληρώστε όλα τα πεδία.'
            },
            en: {
                language_label: 'Language:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Welcome',
                welcome_tagline: 'A journey of flavors awaits you.',
                form_name_label: 'Full Name:',
                form_phone_label: 'Phone:',
                form_email_label: 'Email:',
                form_date_label: 'Date:',
                form_time_label: 'Time:',
                form_guests_label: 'Number of Guests:',
                submit_button_text: 'Submit Reservation',
                confirmation_message_text: 'Thank you! Your reservation has been successfully submitted.',
                reservation_summary_title: 'Reservation Summary',
                summary_name: 'Full Name:',
                summary_date: 'Date:',
                summary_time: 'Time:',
                summary_guests: 'Number of Guests:',
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Please fill in all fields.'
            },
            fr: {
                language_label: 'Langue:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Bienvenue',
                welcome_tagline: 'Un voyage de saveurs vous attend.',
                form_name_label: 'Nom complet:',
                form_phone_label: 'Téléphone:',
                form_email_label: 'Email:',
                form_date_label: 'Date:',
                form_time_label: 'Heure:',
                form_guests_label: 'Nombre de personnes:',
                submit_button_text: 'Soumettre la réservation',
                confirmation_message_text: 'Merci! Votre réservation a été soumise avec succès.',
                reservation_summary_title: 'Résumé de la réservation',
                summary_name: 'Nom complet:',
                summary_date: 'Date:',
                summary_time: 'Heure:',
                summary_guests: 'Nombre de personnes:',
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Veuillez remplir tous les champs.'
            },
            es: {
                language_label: 'Idioma:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Bienvenido',
                welcome_tagline: 'Un viaje de sabores le espera.',
                form_name_label: 'Nombre completo:',
                form_phone_label: 'Teléfono:',
                form_email_label: 'Email:',
                form_date_label: 'Fecha:',
                form_time_label: 'Hora:',
                form_guests_label: 'Número de personas:',
                submit_button_text: 'Enviar reserva',
                confirmation_message_text: '¡Gracias! Su reserva ha sido enviada con éxito.',
                reservation_summary_title: 'Resumen de la reserva',
                summary_name: 'Nombre completo:',
                summary_date: 'Fecha:',
                summary_time: 'Hora:',
                summary_guests: 'Número de personas:',
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Por favor, complete todos los campos.'
            }
        };

        const form = document.getElementById('reservationForm');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const reservationSummary = document.getElementById('reservationSummary');
        const languageSelector = document.getElementById('language-selector');

        const setLanguage = (lang) => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
            document.querySelector('[data-key="submit_button_text"]').textContent = translations[lang].submit_button_text;
            document.querySelector('[data-key="language_label"]').textContent = translations[lang].language_label;
            
            localStorage.setItem('selectedLang', lang);
        };

        languageSelector.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });

        const savedLang = localStorage.getItem('selectedLang') || 'en';
        languageSelector.value = savedLang;
        setLanguage(savedLang);

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            // Simple validation to ensure all fields are filled
            if (!name || !phone || !email || !date || !time || !guests) {
                alert(translations[languageSelector.value].alert_fill_all);
                return;
            }

            const newReservation = { name, phone, email, date, time, guests };

            try {
                // Αποστολή της κράτησης στον server
                const response = await fetch('http://localhost:3000/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newReservation),
                });

                if (response.ok) {
                    console.log('Η κράτηση υποβλήθηκε επιτυχώς στον server.');
                    
                    // Εμφάνιση μηνύματος επιβεβαίωσης και σύνοψης
                    form.classList.add('hidden');
                    confirmationMessage.classList.remove('hidden');
                    reservationSummary.classList.remove('hidden');

                    const currentLang = languageSelector.value;
                    document.getElementById('summaryName').textContent = `${translations[currentLang].summary_name} ${name}`;
                    document.getElementById('summaryDate').textContent = `${translations[currentLang].summary_date} ${date}`;
                    document.getElementById('summaryTime').textContent = `${translations[currentLang].summary_time} ${time}`;
                    document.getElementById('summaryGuests').textContent = `${translations[currentLang].summary_guests} ${guests}`;

                    setTimeout(() => {
                        confirmationMessage.classList.add('hidden');
                        reservationSummary.classList.add('hidden');
                        form.classList.remove('hidden');
                        form.reset();
                    }, 10000);
                } else {
                    console.error('Αποτυχία υποβολής κράτησης:', response.statusText);
                    alert('Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε ξανά.');
                }

            } catch (error) {
                console.error('Σφάλμα κατά την υποβολή της κράτησης:', error);
                alert('Παρουσιάστηκε σφάλμα. Παρακαλώ ελέγξτε τη σύνδεσή σας στο διαδίκτυο.');
            }
        });
    }

    if (document.getElementById('adminLogin')) {
        const adminPasswordInput = document.getElementById('adminPassword');
        const loginButton = document.getElementById('loginButton');
        const adminPanel = document.getElementById('adminPanel');
        const adminDateInput = document.getElementById('adminDate');
        const reservationsTableBody = document.querySelector('#reservationsTable tbody');
        
        const ADMIN_PASSWORD = 'admin123';

        // Ενημέρωση της λογικής του admin panel
        const displayReservations = async (date) => {
            reservationsTableBody.innerHTML = '';
            
            try {
                // Λήψη των κρατήσεων από τον server
                const response = await fetch('http://localhost:3000/api/reservations');
                const reservations = await response.json();

                const filteredReservations = reservations.filter(res => res.date === date);

                if (filteredReservations.length > 0) {
                    filteredReservations.forEach(res => {
                        const row = reservationsTableBody.insertRow();
                        row.innerHTML = `
                            <td>${res.time}</td>
                            <td>${res.name}</td>
                            <td>${res.phone}</td>
                            <td>${res.guests}</td>
                        `;
                    });
                } else {
                    const row = reservationsTableBody.insertRow();
                    const cell = row.insertCell(0);
                    cell.colSpan = 4;
                    cell.textContent = 'Δεν βρέθηκαν κρατήσεις για αυτή την ημερομηνία.';
                    cell.style.textAlign = 'center';
                }
            } catch (error) {
                console.error('Αποτυχία λήψης κρατήσεων:', error);
                const row = reservationsTableBody.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 4;
                cell.textContent = 'Αδυναμία φόρτωσης κρατήσεων.';
                cell.style.textAlign = 'center';
            }
        };

        loginButton.addEventListener('click', () => {
            if (adminPasswordInput.value === ADMIN_PASSWORD) {
                document.getElementById('adminLogin').classList.add('hidden');
                adminPanel.classList.remove('hidden');
                
                const today = new Date().toISOString().split('T')[0];
                adminDateInput.value = today;
                displayReservations(today);
            } else {
                alert('Λάθος κωδικός πρόσβασης.');
                adminPasswordInput.value = '';
            }
        });

        adminDateInput.addEventListener('change', (event) => {
            const selectedDate = event.target.value;
            displayReservations(selectedDate);
        });
    }
});                form_guests_label: 'Number of Guests:',
                submit_button_text: 'Submit Reservation',
                confirmation_message_text: 'Thank you! Your reservation has been successfully submitted.',
                reservation_summary_title: 'Reservation Summary',
                summary_name: 'Full Name:',
                summary_date: 'Date:',
                summary_time: 'Time:',
                summary_guests: 'Number of Guests:',
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Please fill in all fields.'
            },
            fr: {
                language_label: 'Langue:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Bienvenue',
                welcome_tagline: 'Un voyage de saveurs vous attend.',
                form_name_label: 'Nom complet:',
                form_phone_label: 'Téléphone:',
                form_email_label: 'Email:',
                form_date_label: 'Date:',
                form_time_label: 'Heure:',
                form_guests_label: 'Nombre de personnes:',
                submit_button_text: 'Soumettre la réservation',
                confirmation_message_text: 'Merci! Votre réservation a été soumise avec succès.',
                reservation_summary_title: 'Résumé de la réservation',
                summary_name: 'Nom complet:',
                summary_date: 'Date:',
                summary_time: 'Heure:',
                summary_guests: 'Nombre de personnes:',
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Veuillez remplir tous les champs.'
            },
            es: {
                language_label: 'Idioma:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Bienvenido',
                welcome_tagline: 'Un viaje de sabores le espera.',
                form_name_label: 'Nombre completo:',
                form_phone_label: 'Teléfono:',
                form_email_label: 'Email:',
                form_date_label: 'Fecha:',
                form_time_label: 'Hora:',
                form_guests_label: 'Número de personas:',
                submit_button_text: 'Enviar reserva',
                confirmation_message_text: '¡Gracias! Su reserva ha sido enviada con éxito.',
                reservation_summary_title: 'Resumen de la reserva',
                summary_name: 'Nombre completo:',
                summary_date: 'Fecha:',
                summary_time: 'Hora:',
                summary_guests: 'Número de personas:',
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Por favor, complete todos los campos.'
            }
        };

        const form = document.getElementById('reservationForm');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const reservationSummary = document.getElementById('reservationSummary');
        const languageSelector = document.getElementById('language-selector');

        const setLanguage = (lang) => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
            document.querySelector('[data-key="submit_button_text"]').textContent = translations[lang].submit_button_text;
            document.querySelector('[data-key="language_label"]').textContent = translations[lang].language_label;
            
            localStorage.setItem('selectedLang', lang);
        };

        languageSelector.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });

        const savedLang = localStorage.getItem('selectedLang') || 'en';
        languageSelector.value = savedLang;
        setLanguage(savedLang);

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            // Simple validation to ensure all fields are filled
            if (!name || !phone || !email || !date || !time || !guests) {
                alert(translations[languageSelector.value].alert_fill_all);
                return;
            }

            const newReservation = { name, phone, email, date, time, guests };

            try {
                // Αποστολή της κράτησης στον server
                const response = await fetch('http://localhost:3000/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newReservation),
                });

                if (response.ok) {
                    console.log('Η κράτηση υποβλήθηκε επιτυχώς στον server.');
                    
                    // Εμφάνιση μηνύματος επιβεβαίωσης και σύνοψης
                    form.classList.add('hidden');
                    confirmationMessage.classList.remove('hidden');
                    reservationSummary.classList.remove('hidden');

                    const currentLang = languageSelector.value;
                    document.getElementById('summaryName').textContent = `${translations[currentLang].summary_name} ${name}`;
                    document.getElementById('summaryDate').textContent = `${translations[currentLang].summary_date} ${date}`;
                    document.getElementById('summaryTime').textContent = `${translations[currentLang].summary_time} ${time}`;
                    document.getElementById('summaryGuests').textContent = `${translations[currentLang].summary_guests} ${guests}`;

                    setTimeout(() => {
                        confirmationMessage.classList.add('hidden');
                        reservationSummary.classList.add('hidden');
                        form.classList.remove('hidden');
                        form.reset();
                    }, 10000);
                } else {
                    console.error('Αποτυχία υποβολής κράτησης:', response.statusText);
                    alert('Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε ξανά.');
                }

            } catch (error) {
                console.error('Σφάλμα κατά την υποβολή της κράτησης:', error);
                alert('Παρουσιάστηκε σφάλμα. Παρακαλώ ελέγξτε τη σύνδεσή σας στο διαδίκτυο.');
            }
        });
    }

    if (document.getElementById('adminLogin')) {
        const adminPasswordInput = document.getElementById('adminPassword');
        const loginButton = document.getElementById('loginButton');
        const adminPanel = document.getElementById('adminPanel');
        const adminDateInput = document.getElementById('adminDate');
        const reservationsTableBody = document.querySelector('#reservationsTable tbody');
        
        const ADMIN_PASSWORD = 'admin123';

        // Ενημέρωση της λογικής του admin panel
        const displayReservations = async (date) => {
            reservationsTableBody.innerHTML = '';
            
            try {
                // Λήψη των κρατήσεων από τον server
                const response = await fetch('http://localhost:3000/api/reservations');
                const reservations = await response.json();

                const filteredReservations = reservations.filter(res => res.date === date);

                if (filteredReservations.length > 0) {
                    filteredReservations.forEach(res => {
                        const row = reservationsTableBody.insertRow();
                        row.innerHTML = `
                            <td>${res.time}</td>
                            <td>${res.name}</td>
                            <td>${res.phone}</td>
                            <td>${res.guests}</td>
                        `;
                    });
                } else {
                    const row = reservationsTableBody.insertRow();
                    const cell = row.insertCell(0);
                    cell.colSpan = 4;
                    cell.textContent = 'Δεν βρέθηκαν κρατήσεις για αυτή την ημερομηνία.';
                    cell.style.textAlign = 'center';
                }
            } catch (error) {
                console.error('Αποτυχία λήψης κρατήσεων:', error);
                const row = reservationsTableBody.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 4;
                cell.textContent = 'Αδυναμία φόρτωσης κρατήσεων.';
                cell.style.textAlign = 'center';
            }
        };

        loginButton.addEventListener('click', () => {
            if (adminPasswordInput.value === ADMIN_PASSWORD) {
                document.getElementById('adminLogin').classList.add('hidden');
                adminPanel.classList.remove('hidden');
                
                const today = new Date().toISOString().split('T')[0];
                adminDateInput.value = today;
                displayReservations(today);
            } else {
                alert('Λάθος κωδικός πρόσβασης.');
                adminPasswordInput.value = '';
            }
        });

        adminDateInput.addEventListener('change', (event) => {
            const selectedDate = event.target.value;
            displayReservations(selectedDate);
        });
    }
});                    Τηλέφωνο: ${phone}
                    Email: ${email}
                    Ημερομηνία: ${date}
                    Ώρα: ${time}
                    Αριθμός Ατόμων: ${guests}
                `,
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Παρακαλώ συμπληρώστε όλα τα πεδία.'
            },
            en: {
                language_label: 'Language:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Welcome',
                welcome_tagline: 'A journey of flavors awaits you.',
                form_name_label: 'Full Name:',
                form_phone_label: 'Phone:',
                form_email_label: 'Email:',
                form_date_label: 'Date:',
                form_time_label: 'Time:',
                form_guests_label: 'Number of Guests:',
                submit_button_text: 'Submit Reservation',
                confirmation_message_text: 'Thank you! Your reservation has been successfully submitted.',
                customer_email_subject: 'Reservation Confirmation - Pandrosou Garden Restaurant',
                customer_email_body: (name, date, time, guests) => `
                    Dear ${name},

                    Thank you for your reservation at Pandrosou Garden Restaurant.

                    Reservation Details:
                    Date: ${date}
                    Time: ${time}
                    Number of Guests: ${guests}

                    We look forward to seeing you!
                `,
                restaurant_email_subject: 'New Reservation',
                restaurant_email_body: (name, phone, email, date, time, guests) => `
                    New reservation at Pandrosou Garden Restaurant:

                    Full Name: ${name}
                    Phone: ${phone}
                    Email: ${email}
                    Date: ${date}
                    Time: ${time}
                    Number of Guests: ${guests}
                `,
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Please fill in all fields.'
            },
            fr: {
                language_label: 'Langue:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Bienvenue',
                welcome_tagline: 'Un voyage de saveurs vous attend.',
                form_name_label: 'Nom complet:',
                form_phone_label: 'Téléphone:',
                form_email_label: 'Email:',
                form_date_label: 'Date:',
                form_time_label: 'Heure:',
                form_guests_label: 'Nombre de personnes:',
                submit_button_text: 'Soumettre la réservation',
                confirmation_message_text: 'Merci! Votre réservation a été soumise avec succès.',
                customer_email_subject: 'Confirmation de réservation - Pandrosou Garden Restaurant',
                customer_email_body: (name, date, time, guests) => `
                    Cher(e) ${name},

                    Merci pour votre réservation au Pandrosou Garden Restaurant.

                    Détails de la réservation:
                    Date: ${date}
                    Heure: ${time}
                    Nombre de personnes: ${guests}

                    Nous nous réjouissons de vous voir!
                `,
                restaurant_email_subject: 'Nouvelle réservation',
                restaurant_email_body: (name, phone, email, date, time, guests) => `
                    Nouvelle réservation au Pandrosou Garden Restaurant:

                    Nom complet: ${name}
                    Téléphone: ${phone}
                    Email: ${email}
                    Date: ${date}
                    Heure: ${time}
                    Nombre de personnes: ${guests}
                `,
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Veuillez remplir tous les champs.'
            },
            es: {
                language_label: 'Idioma:',
                header_title: 'Pandrosou Garden Restaurant',
                welcome_message: 'Bienvenido',
                welcome_tagline: 'Un viaje de sabores le espera.',
                form_name_label: 'Nombre completo:',
                form_phone_label: 'Teléfono:',
                form_email_label: 'Email:',
                form_date_label: 'Fecha:',
                form_time_label: 'Hora:',
                form_guests_label: 'Número de personas:',
                submit_button_text: 'Enviar reserva',
                confirmation_message_text: '¡Gracias! Su reserva ha sido enviada con éxito.',
                customer_email_subject: 'Confirmación de reserva - Pandrosou Garden Restaurant',
                customer_email_body: (name, date, time, guests) => `
                    Estimado/a ${name},

                    Gracias por su reserva en Pandrosou Garden Restaurant.

                    Detalles de la reserva:
                    Fecha: ${date}
                    Hora: ${time}
                    Número de personas: ${guests}

                    ¡Esperamos verle pronto!
                `,
                restaurant_email_subject: 'Nueva reserva',
                restaurant_email_body: (name, phone, email, date, time, guests) => `
                    Nueva reserva en Pandrosou Garden Restaurant:

                    Nombre completo: ${name}
                    Teléfono: ${phone}
                    Email: ${email}
                    Fecha: ${date}
                    Hora: ${time}
                    Número de personas: ${guests}
                `,
                footer_text: '© 2025 Pandrosou Garden Restaurant',
                alert_fill_all: 'Por favor, complete todos los campos.'
            }
        };

        const form = document.getElementById('reservationForm');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const languageSelector = document.getElementById('language-selector');

        const setLanguage = (lang) => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
            document.querySelector('[data-key="submit_button_text"]').textContent = translations[lang].submit_button_text;
            document.querySelector('[data-key="language_label"]').textContent = translations[lang].language_label;
            
            localStorage.setItem('selectedLang', lang);
        };

        languageSelector.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });

        const savedLang = localStorage.getItem('selectedLang') || 'en';
        languageSelector.value = savedLang;
        setLanguage(savedLang);

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            const newReservation = { name, phone, email, date, time, guests };
            let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
            reservations.push(newReservation);
            localStorage.setItem('reservations', JSON.stringify(reservations));

            console.log('New Reservation added:', newReservation);

            // 1. Δημιουργία QR code
            const qrcodeContainer = document.getElementById('qrcode');
            qrcodeContainer.innerHTML = '';
            const qr = qrcode(0, 'L');
            const reservationData = JSON.stringify(newReservation);
            qr.addData(reservationData);
            qr.make();
            
            // Διόρθωση: Δημιουργία ενός προσωρινού στοιχείου για να μετατρέψουμε το HTML string σε Node
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = qr.createImgTag(4, 8);
            const qrCodeImage = tempDiv.firstChild;
            
            qrcodeContainer.appendChild(qrCodeImage);
            
            // Παίρνουμε τη βάση64 εικόνα του QR code για το email
            const qrcodeSrc = qrcodeContainer.querySelector('img').src;


            // 2. Προετοιμασία και αποστολή email
            const currentLang = languageSelector.value;
            
            // Παράμετροι για το email του πελάτη
            const customerEmailParams = {
                name: name,
                email: email,
                subject: translations[currentLang].customer_email_subject,
                message: translations[currentLang].customer_email_body(name, date, time, guests),
                qrcode: qrcodeSrc
            };

            // Παράμετροι για το email του εστιατορίου
            const restaurantEmailParams = {
                to_email: 'pandrosougarden@gmail.com', // Σταθερό email του εστιατορίου
                from_name: 'Pandrosou Garden Website',
                subject: translations[currentLang].restaurant_email_subject,
                message: translations[currentLang].restaurant_email_body(name, phone, email, date, time, guests),
                name: name // for template purposes
            };

            try {
                // Αποστολή email στον πελάτη
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_CUSTOMER_TEMPLATE_ID', customerEmailParams);
                console.log('Customer email sent successfully!');

                // Αποστολή email στο εστιατόριο
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_RESTAURANT_TEMPLATE_ID', restaurantEmailParams);
                console.log('Restaurant email sent successfully!');

            } catch (error) {
                console.log('Failed to send email...', error);
            }
            
            form.reset();
            confirmationMessage.classList.remove('hidden');
            setTimeout(() => {
                confirmationMessage.classList.add('hidden');
                qrcodeContainer.innerHTML = '';
            }, 10000);
        });
    }

    if (document.getElementById('adminLogin')) {
        const adminPasswordInput = document.getElementById('adminPassword');
        const loginButton = document.getElementById('loginButton');
        const adminPanel = document.getElementById('adminPanel');
        const adminDateInput = document.getElementById('adminDate');
        const reservationsTableBody = document.querySelector('#reservationsTable tbody');
        
        const ADMIN_PASSWORD = 'admin123';

        const displayReservations = (date) => {
            reservationsTableBody.innerHTML = '';
            const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
            const filteredReservations = reservations.filter(res => res.date === date);

            if (filteredReservations.length > 0) {
                filteredReservations.forEach(res => {
                    const row = reservationsTableBody.insertRow();
                    row.innerHTML = `
                        <td>${res.time}</td>
                        <td>${res.name}</td>
                        <td>${res.phone}</td>
                        <td>${res.guests}</td>
                    `;
                });
            } else {
                const row = reservationsTableBody.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 4;
                cell.textContent = 'Δεν βρέθηκαν κρατήσεις για αυτή την ημερομηνία.';
                cell.style.textAlign = 'center';
            }
        };

        loginButton.addEventListener('click', () => {
            if (adminPasswordInput.value === ADMIN_PASSWORD) {
                document.getElementById('adminLogin').classList.add('hidden');
                adminPanel.classList.remove('hidden');
                
                const today = new Date().toISOString().split('T')[0];
                adminDateInput.value = today;
                displayReservations(today);
            } else {
                alert('Λάθος κωδικός πρόσβασης.');
                adminPasswordInput.value = '';
            }
        });

        adminDateInput.addEventListener('change', (event) => {
            const selectedDate = event.target.value;
            displayReservations(selectedDate);
        });
    }
});


