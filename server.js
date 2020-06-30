const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
var md5 = require('md5');

const app = express();

const GMAIL_USER = "***";
const GMAIL_PASS = "***"

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
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hsharma1_be19@thapar.edu',
            pass: 'IlU__HS!'
        }
    });
    var mailOptions = {
        from: GMAIL_USER,
        to: GMAIL_USER,
        subject: 'New message from contact form at Herroku',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return (console.log(error));
        }
        res.sendFile("index.html");
        console.log("Successfully Sent Message");
    });
});
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000.");
});

