const scrolToTopBtn = document.querySelector("#scrolToTopBtn");
const fixTheContent = document.querySelector("#fexed-content");


window.addEventListener("scroll", scrollFunction);
function scrollFunction() {
    if(window.scrollY > 500) {
        scrolToTopBtn.style.display = "block";
    }
    else {
        scrolToTopBtn.style.display = "none"
    }
};

scrolToTopBtn.addEventListener("click", toTop);

function toTop() {
    window.scrollTo(0, 0);
};

// window.addEventListener("scroll",function(){
//     var off = window.pageYOffset;
//     console.log(off)
// });

let navbar = document.getElementById("navbarscrol");

window.onscroll = function() {
    if (window.pageYOffset > 100 && window.innerWidth > 1100) {
        navbar.style.backgroundColor = "#494850";
    }
    else if(window.pageYOffset < 100 && window.innerWidth > 1100){
        navbar.style.backgroundColor = "transparent";
    }
    if(window.pageYOffset > 724){
        fixTheContent.classList.add("fexed-content");
    }else if(window.pageYOffset < 724 || window.pageYOffset > 5037.33349609375){
        fixTheContent.classList.remove("fexed-content");
    }
}
window.addEventListener("resize",function(){
    if(window.innerWidth < 1100){
        navbar.style.backgroundColor = "#494850";
    }
    else if(window.pageYOffset < 100){
        navbar.style.backgroundColor = "transparent";
    }
});
window.addEventListener('scroll', function() {
    if(window.pageYOffset > 5090){
        fixTheContent.classList.remove("fexed-content");
    }
});