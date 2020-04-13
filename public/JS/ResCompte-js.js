// var globUserData = {};
var globCarIndex = -1;
window.onload = () => {
    $.ajax({
        url: "/User",
        type: "POST",
        dataType: "json",
        success: data => {
            console.log("data received !", data);
            DataUser = data;
            globUserData = data;
            Remplissage();
        }
    });
    // $.post("/User", {}, function (data) {
    //     console.log("data received !", data);
    //     DataUser = data;
    //     globUserData = data;
    // });

    //console.log(globUserData);

    function Remplissage() {
        document.getElementById("N").value = globUserData.Prenom;
        document.getElementById("P").value = globUserData.Nom;
        document.getElementById("DateN").value = globUserData.Birth;
    }

    let disables = document.getElementsByClassName('Disable');// liste des Zones textes desactivées.
    var Btnchoix = document.getElementsByClassName('choix'); // liste de btns choisir
    document.getElementById('Pre').addEventListener('click', () => {
        filter("Prestige");
    });
    document.getElementById('Util').addEventListener('click', () => {
        filter("Utility");
    });
    document.getElementById('Mar').addEventListener('click', () => {
        filter("Mariage");
    });

    menuOp();

    // var BTNRES = document.getElementById("BTNRes");
    // BTNRES.addEventListener('click',()=>{
    //     visibleValider();
    //     Recup();   
    // });



    // Pour filter LEs categories de Voiture de location 
    function filter(x) {
        let all = document.getElementsByClassName('Voitures');
        for (let i = 0; i < all.length; i++) {
            if (all[i].getAttribute('class').search(x) <= -1)
                all[i].style.display = "none";
            else
                all[i].style.display = "flex";
        }
    }
    ///////////////////////////////////////////////////////////////////

    /////////////////////////////// Gestion Menu responsive
    function menuOp() {
        const _MENU_CLOSE = document.getElementById('nav-close');
        const _MENU_OPEN = document.getElementById('nav-menu-icon');
        const _MENU = document.getElementById('nav-menu');
        let state = false;
        _MENU_OPEN.addEventListener('click', () => {
            _MENU_OPEN.style.display = 'none';
            if (!state) {
                _MENU.style.display = "flex";
                state = true;
            }
        });
        _MENU_CLOSE.addEventListener('click', () => {
            _MENU_OPEN.style.display = 'block';
            if (state) {
                _MENU.style.display = "none";
                state = false;
            }
        });
    }
    /////////////////////////////////////////////////////////////////////////////////////

    //Fonction Active Zone(elem)
    function enable(elem) {
        elem.disabled = false;
    }
    ////////////////////////////

    /////////////// activer les Zones de teexte quand on click sur Choisir  +MAJUSCULE
    for (let i = 0; i < Btnchoix.length; i++) {
        Btnchoix[i].addEventListener('click', () => {
            UpdateIMG(i);
            // 
            document.getElementById('idCar').setAttribute('value', i);
            document.getElementById('userMail').setAttribute('value', globUserData.Email);
            // 
            document.getElementById('BTNRes').disabled = false;
            for (var j = 3; j < disables.length; j++) {
                enable(disables[j]);
            }
        });
    }
    var Tableau = document.getElementsByClassName('Disable');
    for (let i = 0; i < Tableau.length; i++) {
        Tableau[i].onkeyup = () => {
            Tableau[i].value = Tableau[i].value.toUpperCase();
        };
    }
    ////////////////////////////////////////////////////////////////////////////////////

    //////////////////vider les Zones De Textes///////////////////////////
    var Vider = document.getElementById("Vider"); // 

    function ViderChamps() {
        var Tableau = document.getElementsByClassName('Disable');
        for (let i = 3; i < Tableau.length; i++) {
            Tableau[i].value = "";
        }
    }
    Vider.addEventListener('click', ViderChamps);
    //////////////////////////////////////////////////////////////////////


    //////////////////////// Recuperer L'image Sélectionnée lors du click sur btn Choix[i];
    function UpdateIMG(pos) {
        let Pop = document.getElementById("ImgPOP");
        var img = document.getElementsByClassName('IMGBTN')[pos].children[0].src;
        Pop.src = img;
        console.log(img);
        // Pop.style.background = "url("+img +")";
    }
    /////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////Recuperer Les Zones de textes et afficher sur le POP UP ////////////
    function Recup() {
        let elems = document.getElementsByClassName("Disable");
        let NP = document.getElementById("N&P");
        let Resume = document.getElementById("Resume");
        const _DATA = [];
        // recup de donnees saisis en Reservation
        for (let i = 0; i < elems.length; i++) {
            _DATA.push(elems[i].value);
        }
        const dateN = new Date(_DATA[2]);
        var annee = 2020 - dateN.getFullYear();
        const dateD = new Date(_DATA[3]);
        const dateR = new Date(_DATA[4]);
        var jours = dateR.getTime() - dateD.getTime();
        // différence de jours
        var Difference = jours / (1000 * 3600 * 24);
        if (Difference < 0) {
            Difference = "ErreurDay!!";
        }
        NP.innerText = "Cher Client : " + _DATA[0] + " " + _DATA[1];
        Resume.innerText = "Vous avez " + annee + " ans,et vous avez reservez cette Voiture pendant :" + Difference + " jours";
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////Pour avoir apparaitre le POP UP
    function visibleValider() {
        var PageConn = document.getElementById("POPUP");
        PageConn.style.display = "block";
    }
    ////////////////////////////////////////////////////////////
} 

