var firebaseConfig = {
    apiKey: "APIKEY",
    authDomain: "amalfi-tiles.firebaseapp.com",
    databaseURL: "https://amalfi-tiles.firebaseio.com",
    projectId: "amalfi-tiles",
    storageBucket: "amalfi-tiles.appspot.com",
    messagingSenderId: "ID",
    appId: "ID"
};
firebase.initializeApp(firebaseConfig);

var contactRef = firebase.database().ref('page_1');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    var fullName = getInputValues('fullName');
    var phone = getInputValues('phone');
    var email = getInputValues('email');
    var newsletter = document.querySelector('input[name="newsletter"]:checked').value;
    var callTimeId = document.getElementById("callTime");
    var callTime = callTimeId.options[callTimeId.selectedIndex].value;
    var timestamp = new Date().toISOString();
    var jobTypeChecked = Array.prototype.slice.call(document.querySelectorAll('[name=jobType]:checked'));
    var jobTypeValues = jobTypeChecked.map(function (el) {
        return el.value;
    });
    var jobType = jobTypeValues.join(',');
    var client = "Amalfi"

    //define email.js variables
    var templateParams = {
        client: client,
        time: timestamp,
        name: fullName,
        phone: phone,
        email: email,
        newsletter: newsletter,
        job: callTime,
        call: jobType
    };


    saveContact(fullName, phone, email, timestamp, jobType, callTime, newsletter);

    //send form through email.js
    emailjs.send('gmail', 'send', templateParams);

    document.querySelector('.alert').style.display = 'block';

    setTimeout(function () {
        document.querySelector('.alert').style.display = 'none';
    }, 5000);

    document.getElementById('contactForm').reset();
}

function getInputValues(id) {
    return document.getElementById(id).value;
}

function saveContact(fullName, phone, email, timestamp, callTime, jobType, newsletter) {
    var newLeadRef = contactRef.push();
    newLeadRef.set({
        time: timestamp,
        name: fullName,
        phone: phone,
        email: email,
        job: callTime,
        call: jobType,
        newsletter: newsletter
    })
}