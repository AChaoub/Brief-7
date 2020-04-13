window.onload = () => {
    var P1 = document.getElementById("P1");
    var P2 = document.getElementById("P2");
    var P3 = document.getElementById("P3");
    var N1 = document.getElementById("N1");
    var N2 = document.getElementById("N2");
    var N3 = document.getElementById("N3");
    var slide1 = document.getElementById("Slides1");
    var slide2 = document.getElementById("Slides2");
    var slide3 = document.getElementById("Slides3");

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
       

    
     
    N1.addEventListener('click', ()=>{
        slide2.style.display  = "flex";
        DisplayNone(slide1,slide3);
        
    } );
    P1.addEventListener('click', ()=>{
        slide3.style.display  = "flex";
        DisplayNone(slide1,slide2);
        
    });
    N2.addEventListener('click', ()=>{
        DisplayNone(slide2,slide1);
        slide3.style.display  = "flex";
    });
    P2.addEventListener('click', ()=>{
        DisplayNone(slide2,slide3);
        slide1.style.display  = "flex";
    });
    N3.addEventListener('click', ()=>{
        DisplayNone(slide2,slide3);
        slide1.style.display  = "flex";
    } );
    P3.addEventListener('click', ()=>{
        DisplayNone(slide3,slide1);
        slide2.style.display  = "flex";
    });
    function DisplayNone(a,b){
        a.style.display = "none";
        b.style.display = "none";
    }
    


}
