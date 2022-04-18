const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const main = document.querySelector(".MainWrapper");
const introduce = document.querySelector("#introduce");
const skill = document.querySelector("#skill");
const navLinks = document.querySelectorAll(".nav-links li");
const MainTitle = document.querySelector(".MainTitleText");


const firstTop = introduce.getBoundingClientRect().top;
const secondTop = skill.getBoundingClientRect().top;

const navAnimation = () => {
  navLinks.forEach((link, idx) => {
    if(link.style.animation){
      link.style.animation="";
    }else{
      link.style.animation = `navLinkFade 0.5s ease forwards ${idx/7+0.5}s`;
    }
  });
};

const handleNav = () => {
  nav.classList.toggle("nav-active");
  navAnimation();
  burger.classList.toggle("toggle");
};

const navSlide = () => {
  burger.addEventListener("click", handleNav);
};

const setNavTransition = (width) => {
  if(width>768){
    nav.style.transition = "";
  }else{
    nav.style.transition = "transform 0.5s ease-in";
  }
};

const handleResize = () => {
  const width = event.target.innerWidth;
  setNavTransition(width);
};


const init = () => {
  AOS.init();
  window.addEventListener("resize", handleResize);
  navSlide();
  setInterval(()=>{
    MainTitle.style.backgroundSize = MainTitle.style.backgroundSize === "100% 100%" ? "0% 100%" : "100% 100%" ;
  },5000);

  navLinks[0].addEventListener("click", () => {
    window.scroll({top:window.pageYOffset+firstTop, behavior: 'smooth'});
  });
  navLinks[1].addEventListener("click", () => {
    window.scroll({top:window.pageYOffset+secondTop, behavior: 'smooth'});
  });
}

init();

