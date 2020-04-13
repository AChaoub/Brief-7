window.onload = () => {

    document.getElementById('Pre').addEventListener('click',()=>{
        filter("Prestige");
    });
    document.getElementById('Util').addEventListener('click',()=>{
        filter("Utility");
    });
    document.getElementById('Mar').addEventListener('click',()=>{
        filter("Mariage");
    });
    
    function filter(x){
        let all = document.getElementsByClassName('Voitures');
        for(let i=0;i<all.length;i++){
            if(all[i].getAttribute('class').search(x) <= -1)
                all[i].style.display = "none";   
            else
                all[i].style.display = "flex";
        }
    }




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
    menuOp();


    let disables = document.getElementsByClassName('Disable');
    var Btnchoix = document.getElementsByClassName('choix');

    function enable(elem){
        elem.disabled =false;
    }
    for(let i = 0 ; i<Btnchoix.length;i++){
        Btnchoix[i].addEventListener('click', ()=>{
            UpdateIMG(i);
            document.getElementById('BTNRes').disabled = false;
            for(var j = 0 ; j<disables.length;j++){
                enable(disables[j]);
            }
        });
    }
    var Tableau = document.getElementsByClassName('Disable');
    for(let i=0;i<Tableau.length;i++){
        Tableau[i].onkeyup=()=>{
            Tableau[i].value = Tableau[i].value.toUpperCase();
        };
    }

    var Vider = document.getElementById("Vider");

    function ViderChamps(){
        var Tableau = document.getElementsByClassName('Disable');
        for(let i=0;i<Tableau.length;i++){
            Tableau[i].value ="";
        }
    }
    Vider.addEventListener('click',ViderChamps);


    

    function UpdateIMG(pos){
        let Pop = document.getElementById("ImgPOP");
        var img = document.getElementsByClassName('IMGBTN')[pos].children[0].src;
        Pop.src = img;
        console.log(img);
        // Pop.style.background = "url("+img +")";
    }


    function Recup(){
        let elems = document.getElementsByClassName("Disable");
        let NP = document.getElementById("N&P");
        let Resume = document.getElementById("Resume");
        const _DATA = [];
        // recup de donnees saisis en Reservation
        for (let i = 0; i < elems.length; i++) {
            _DATA.push(elems[i].value);
        }
        const dateN = new Date(_DATA[2]);
        var annee = 2020 - dateN.getFullYear() ;
        const dateD = new Date(_DATA[3]);
        const dateR = new Date(_DATA[4]);
        var jours = dateR.getTime() - dateD.getTime();
        // différence de jours
       var Difference = jours / (1000 * 3600 * 24);
       if(Difference < 0){
           Difference = "ErreurDay!!";

       }
        NP.innerText = "Cher Client : "+_DATA[0]+" "+_DATA[1]; 
        Resume.innerText = "Vous avez "+annee+ " ans,et vous avez reservez cette Voiture pendant :"+Difference+" jours";
    }
    function visibleValider(){
        var PageConn = document.getElementById("POPUP");
        PageConn.style.display ="block";
    }
    var BTNRES = document.getElementById("BTNRes");
    BTNRES.addEventListener('click',()=>{
        visibleValider();
        Recup();
        
    });
    

}


