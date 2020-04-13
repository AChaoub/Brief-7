var globReserParEmail = {};
var Cars = [];
let Imgaffichage = document.getElementsByClassName('mod');
let Imgsuppression = document.getElementsByClassName('sup');
window.onload = () => {
  $.ajax({
    url: "/Voitures",
    type: "GET",
    dataType: "json",
    success: data => {
      console.log("data received !", data);
      Cars = data;
    }
  });

  $.ajax({
    url: "/User",
    type: "POST",
    dataType: "json",
    success: data => {
      //console.log("data received !", data);
      DataUser1 = data;
      Remplissage();
    }
  });

  $.ajax({
    url: "/VoitureEmail",
    type: "GET",
    dataType: "json",
    success: data => {
      //console.log("data received !", data);
      globReserParEmail = data;
      AjouterDivInterf();
      masquerZone();
    }
  });



  function Remplissage() {
    let annee = new Date(DataUser1.Birth).getFullYear();
    let anneeCur = new Date().getFullYear();
    document.getElementById("nom").innerText = DataUser1.Nom + "  " + DataUser1.Prenom;
    document.getElementById("email").innerText = DataUser1.Email;
    document.getElementById("ans").innerText = parseInt(anneeCur) - parseInt(annee) + " ANS";
  }


  //Creer Element class
  function CreerElemClass(elem, elemClass) {
    let item = document.createElement(elem);
    item.setAttribute('class', elemClass);
    return item;
  }
  // Creer Element Id
  function CreerElemId(elem, elemId) {
    let item = document.createElement(elem);
    item.setAttribute('id', elemId);
    return item;
  }



  // Remplissage Automatique Interface HTML
  function AjouterDivInterf() {
    globReserParEmail.forEach(obj => {
      DivReservation(obj);
    });
    /////// CLick Btn Modifier Pour afficher la zone Modif

    let zones = document.getElementsByClassName('partieModif');
    let zones1 = document.getElementsByClassName('Flex');
    let btnModif = document.getElementsByClassName('Btn1');
    let Reservselectionee;

    for (let i = 0; i < Imgaffichage.length; i++) {
      Imgaffichage[i].addEventListener('click', () => {
        zones[i].style.display = "block";
      });
    }

    for (let i = 0; i < Imgsuppression.length; i++) {
      Imgsuppression[i].addEventListener('click', () => {

        zones1[i].style.display = "none";
        Reservselectionee = globReserParEmail[i].id; // recuperation ID reservation pour la supprimer
        $.post("/delete", {
          id: Reservselectionee
        }, function (data) {
          console.log("data received !", data);
        });

      });
    }

    for (let i = 0; i < Imgsuppression.length; i++) {
      btnModif[i].addEventListener('click', () => {
        console.log(globReserParEmail[i]);
        Reservselectionee = globReserParEmail[i].id; // recuperation ID reservation pour la supprimer
        $.post("/MAJ", {
          id: Reservselectionee,
          Email: DataUser1.Email,
          dateD: document.getElementsByName("dateD")[i].value,
          dateR: document.getElementsByName("dateR")[i].value,
          SelectCategorie: document.getElementsByName("SelectCategorie")[i].options[document.getElementsByName("SelectCategorie")[i].selectedIndex].value,
          SelectModele: document.getElementsByName("SelectModele")[i].options[document.getElementsByName("SelectModele")[i].selectedIndex].value
        }, function (data) {
          console.log("data received !", data);
          document.getElementsByClassName("parag3")[i].innerText = document.getElementsByName("SelectModele")[i].options[document.getElementsByName("SelectModele")[i].selectedIndex].value;
          document.getElementsByClassName("parag1")[i].innerText = document.getElementsByName("dateD")[i].value;
          document.getElementsByClassName("parag2")[i].innerText = document.getElementsByName("dateR")[i].value;
          masquerZone();
        });


      });
    }



  }


  // remplir Reservation 
  function DivReservation(Serv) {
    let Tableau = document.getElementById("tableauReser");
    let ParagresP = CreerElemClass("p", "parP");
    let Blank1 = CreerElemClass("div", "blank");
    let Flex = CreerElemClass("div", "Flex");
    let partieReserv = CreerElemId("div", "typeCar");
    partieReserv.setAttribute("class", "Reserv");
    let paragModelVoiture = CreerElemClass("p", "parag parag3");
    paragModelVoiture.innerText = Serv.Modele;
    let paragdateDPrinc = CreerElemClass("p", "parag1 parag");
    paragdateDPrinc.innerText = "DATE DE DEPART :" + Serv.DateDepart;
    let paragdateRPrinc = CreerElemClass("p", "parag2 parag");
    paragdateRPrinc.innerText = "DATE DE RETOUR :" + Serv.DateRetour;
    let DivPric = CreerElemClass('div', "partieModif");
    let Divselect = CreerElemClass("div", "select");
    let DivselectCat = CreerElemClass("div", "S1");
    let paragCateg = CreerElemClass("p", "p");
    paragCateg.innerText = "CATEGORIE :";
    let selectCat = CreerElemClass('select', "select1");
    selectCat.setAttribute("name", "SelectCategorie");
    selectCat.setAttribute("class", "S1");
    let option1 = CreerElemClass("option", "option");
    option1.setAttribute("value", "Prestige");
    option1.innerText = "Prestige";
    let option2 = CreerElemClass("option", "option");
    option2.setAttribute("value", "Utility");
    option2.innerText = "Utility";
    let option3 = CreerElemClass("option", "option");
    option3.setAttribute("value", "Mariage");
    option3.innerText = "Mariage";
    selectCat.appendChild(option1);
    selectCat.appendChild(option2);
    selectCat.appendChild(option3);
    let DivselectMod = CreerElemClass("div", "S2");
    let paragMod = CreerElemClass("p", "p");
    paragMod.innerText = "MODELE :";
    let selectMod = CreerElemClass('select', "select1");
    selectMod.setAttribute("name", "SelectModele");
    selectMod.setAttribute("class", "S1");
    let option4 = CreerElemClass("option", "option");
    // option4.setAttribute("value", "Fiat");
    // option4.innerText = "Fiat";
    selectMod.appendChild(option4);
    console.log(Cars);
    for (var i = 0; i < Cars.length; i++) {
      var ModeleCar = document.createElement("option");
      ModeleCar.setAttribute("value", Cars[i].Modele);
      ModeleCar.innerText = Cars[i].Modele;
      selectMod.appendChild(ModeleCar);
    }
    // for(var k = 0 ; Cars.length ;i++){
    //   option[k].setAttribute("value","options[i]");
    //   option[k].innerText = Cars[k].Modele;
    //   selectMod.appendChild(option[k]);
    // }
    let DivDate = CreerElemClass('div', "date");
    let divDateD = CreerElemClass('div', "dateDR");
    let ParagDateD = CreerElemClass('p', 'p');
    ParagDateD.innerText = "DATE DEPART:"
    let DateDep = CreerElemClass('input', 'dateDR');
    DateDep.setAttribute("type", "date");
    DateDep.setAttribute("name", "dateD");
    let divDateR = CreerElemClass('div', "dateDR");
    let ParagDateR = CreerElemClass('p', 'p');
    ParagDateR.innerText = "DATE RETOUR:"
    let DateRet = CreerElemClass('input', 'dateDR');
    DateRet.setAttribute("type", "date");
    DateRet.setAttribute("class", "dateDR");
    DateRet.setAttribute("name", "dateR");
    let btnModif = CreerElemClass('input', 'Btn1');
    btnModif.setAttribute("input", "submit");
    btnModif.setAttribute("value", "MODIFIER");
    let DivCRUD = CreerElemClass('div', "CRUD");
    let imgMod = CreerElemClass('img', "mod");
    let imgSupp = CreerElemClass('img', "sup");
    imgSupp.setAttribute("src", "./IMG/trash.png");
    imgMod.setAttribute("src", "./IMG/pen.png");
    DivCRUD.appendChild(imgMod);
    DivCRUD.appendChild(imgSupp);
    divDateR.appendChild(ParagDateR);
    divDateR.appendChild(DateRet);
    divDateD.appendChild(ParagDateD);
    divDateD.appendChild(DateDep);
    DivDate.appendChild(divDateD);
    DivDate.appendChild(divDateR);
    DivselectMod.appendChild(paragMod);
    DivselectMod.appendChild(selectMod);
    DivselectCat.appendChild(paragCateg);
    DivselectCat.appendChild(selectCat);
    Divselect.appendChild(DivselectCat);
    Divselect.appendChild(DivselectMod);
    Divselect.appendChild(Blank1);
    DivPric.appendChild(Divselect);
    DivPric.appendChild(Blank1);
    DivPric.appendChild(DivDate);
    DivPric.appendChild(btnModif);
    partieReserv.appendChild(paragModelVoiture);
    partieReserv.appendChild(paragdateDPrinc);
    partieReserv.appendChild(paragdateRPrinc);
    partieReserv.appendChild(DivPric);
    Flex.appendChild(partieReserv);
    Flex.appendChild(DivCRUD);
    Flex.appendChild(Blank1);
    Tableau.appendChild(ParagresP);
    Tableau.appendChild(Flex);
    Tableau.appendChild(Blank1);



    //////// j'ai une question a propos de declaration 



  }

  function masquerZone() {
    $('.partieModif').css({
      'display': "none"
    });
  }


}

// Imgsuppression.onclick = () => {
//  
// }