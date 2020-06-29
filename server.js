const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

const app = express();

const GMAIL_USER="hsharma1_be19@thapar.edu";
const GMAIL_PASS="IlU__HS!"

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    })

    // Specify what the email will look like
    const mailOpts = {
        from: 'Your sender info here', // This is ignored by Gmail
        to: GMAIL_USER,
        subject: 'New message from contact form at tylerkrys.ca',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    }

    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            res.sendFile(__dirname+"/success.html") // Show a page indicating failure
        }
        else {
            res.sendFile(__dirname+"/success.html"); // Show a page indicating success
        }
    })
});
app.listen(3000, function () {
    console.log("Server started on port 3000.");
});

