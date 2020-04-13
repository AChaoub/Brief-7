const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const fs = require('fs')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(path.join(__dirname, "public")))
// Rout /
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/Acceuil.html'))
})

// recuperation de Users
var data = fs.readFileSync("infoUtilisateur.json")
var array = JSON.parse(data);

// recuperation de Listes Voitures
var data = fs.readFileSync("Voiture.json")
var voitures = JSON.parse(data);

// recuperation liste Reservations
var data = fs.readFileSync("Reservation.json")
var reservations = JSON.parse(data);




//-----------------------------------> Partie POPUP CONNEXION
let position = -1;
app.post('/con', (req, res) => {
    let email = req.body.EmailC;
    let pass = req.body.PassC;
    for (var i = 0; i < array.length; i++) {
        if ((array[i].Email == email) && (array[i].Password == pass)) {
            position = i;
            break;
        }
    }
    console.log(position);
    if (position > -1) {
        res.sendFile(path.resolve(__dirname, 'public/AcceuilCompte.html'));
    } else
        res.sendFile(path.resolve(__dirname, 'public/Acceuil.html'));
})


////////////////////////////////liste d'emails pour verifier s'il a un email doublant.
let listEmails = [];
for (var i = 0; i < array.length; i++) {
    listEmails.push(array[i].Email);
}


////// sauvegarder dans un fichier JSON USERS
app.post('/register', (req, res) => {
    let jour = req.body.Jour;
    let mois = req.body.Mois;
    let annee = req.body.Annee;
    let dateN = new Date(annee, mois, jour);
    const jsonDate = dateN.toJSON().slice(0, 10); // afficher la format date sans ZoneTime(sans h/m/s)
    let verif = 0;
    for (var i = 0; i < listEmails.length; i++) {
        if (listEmails[i] == req.body.Email) {
            verif = 1;
        }
    }
    if (verif != 1) {
        let utilisateur = {
            id: array.length + 1,
            Prenom: req.body.Prenom,
            Nom: req.body.Nom,
            Password: req.body.Pass,
            Email: req.body.Email,
            Birth: jsonDate,
            Telephone: req.body.Tel
        }
        var usersData = fs.readFileSync('InfoUtilisateur.json', 'utf-8');
        var arrayOfObjects = JSON.parse(usersData)
        arrayOfObjects.push(utilisateur)
        fs.writeFileSync('InfoUtilisateur.json', JSON.stringify(arrayOfObjects, null, 2))
        res.sendFile(path.resolve(__dirname, 'public/Acceuil.html'))
    } else
        res.sendFile(path.resolve(__dirname, 'public/Inscription.html'))
})


// sauvegarder Reservations dans un Fichier JSON RESERVATIONS
app.post('/reserveration', (req, res) => {
    let pos = req.body.idCar;
    let reservation = {
        id: reservations.length + 1,
        Email: req.body.userMail,
        DateDepart: req.body.DateD,
        DateRetour: req.body.DateR,
        Categorie: voitures[pos].Categorie,
        Modele: voitures[pos].Modele
    }
    var ReserData = fs.readFileSync('Reservation.json', 'utf-8');
    var arrayOfReser = JSON.parse(ReserData)
    arrayOfReser.push(reservation)
    fs.writeFileSync('Reservation.json', JSON.stringify(arrayOfReser, null, 2))
    res.sendFile(path.resolve(__dirname, 'public/ReservationCompte.html'))

});



// utiliser Email connecté
app.post("/User", UserRecup);

function UserRecup(req, res) {
    res.send(array[position]);
}

// recuperer array de voitures reserve par "Prop de compte"
app.get("/VoitureEmail", UserEmail);

function UserEmail(req, res) {
    data = fs.readFileSync("Reservation.json")
    reservations = JSON.parse(data);
    let User1 = array[position];
    let TableVoituresEmail = [];
    let positionsRes = [];
    for (var i = 0; i < reservations.length; i++) {
        if (User1.Email == reservations[i].Email) {
            TableVoituresEmail.push(reservations[i]);
            positionsRes.push(i);
        }
    }
    res.send(TableVoituresEmail);
}

app.get("/Voitures", DataCar);

function DataCar(req, res) {
    let cars = voitures;
    res.send(cars);
}

app.post("/delete", function (req, res) {
    reservations = reservations.filter(d => d.id != req.body.id);
    let data = JSON.stringify(reservations, null, 2);
    fs.writeFileSync('reservation.json', data, 'utf-8');
    res.sendFile(path.resolve(__dirname, 'public/Compte.html'));
});

app.post('/MAJ', (req, res) => {
    reservations.forEach((element, i) => {
        if (reservations[i].id == req.body.id) {
            reservations[i].DateDepart = req.body.dateD;
            reservations[i].DateRetour = req.body.dateR;
            reservations[i].Categorie = req.body.SelectCategorie;
            reservations[i].Modele = req.body.SelectModele;
        }
    });
    let data = JSON.stringify(reservations, null, 2);
    fs.writeFileSync('reservation.json', data, 'utf-8');
    res.end("Modification faite avec succes")
});



app.listen(7070, function () {
    console.log('Hello')
})