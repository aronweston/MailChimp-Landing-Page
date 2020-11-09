const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

//bodyparser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

//declare static folder
app.use(express.static(path.join(__dirname, 'public')))

// Automatically allow cross-origin requests
app.use(cors({
    origin: true
}));


//subscribe route
app.post('/subscribe', (req, res) => {
    const {
        fullName,
        email
    } = req.body;

    // Make sure fields are filled
    if (!fullName || !email) {
        res.redirect('/fail.html');
        return;
    }

    //mc data
    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                NAME: fullName,
            },
        }]
    };

    //stringify mcdata
    const postData = JSON.stringify(data);

    fetch('https://us10.api.mailchimp.com/3.0/lists/LISTID', {
            method: 'POST',
            headers: {
                Authorization: 'auth MAILCHIMP API KEY'
            },
            body: postData
        })
        .then(res.statusCode === 200 ?
            res.redirect('/success.html') :
            res.redirect('/fail.html'))
        .catch(err => console.log(err))

})

exports.app = functions.https.onRequest(app);