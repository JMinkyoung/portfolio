const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const main = document.querySelector(".MainWrapper");
const introduce = document.querySelector("#introduce");
const skill = document.querySelector("#skill");
const project = document.querySelector("#project");
const contact = document.querySelector("#contact");
const skillBars = document.querySelectorAll(".skillBar");
const navLinks = document.querySelectorAll(".nav-links li");
const MainTitle = document.querySelector(".MainTitleText");
const topBtn = document.querySelector(".TopButton");

const firstTop = introduce.getBoundingClientRect().top;
const secondTop = skill.getBoundingClientRect().top;

let isVisible = false;

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

const isScrolledIntoView = (el) => {
  let rect = el.getBoundingClientRect();
  let elemTop = rect.top;
  let elemBottom = rect.bottom;
  let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  
  return isVisible;
}

const init = () => {
  AOS.init();

  let skillVisible = false;

  window.addEventListener("resize", handleResize);
  window.addEventListener('scroll', () => {

    if(isScrolledIntoView(document.querySelector("#skill")) && !skillVisible){
      skillVisible = true;
      skillBars.forEach((v)=>{
        v.classList.remove("effect");
        void v.offsetWidth;
        v.classList.add("effect");
      })
    }else if(!isScrolledIntoView(document.querySelector("#skill")) && skillVisible){
      skillVisible = false;
    }
  });

  navSlide();
  setInterval(()=>{
    MainTitle.style.backgroundSize = MainTitle.style.backgroundSize === "100% 100%" ? "0% 100%" : "100% 100%" ;
  },5000);

  navLinks[0].addEventListener("click", () => {
    introduce.scrollIntoView({behavior: 'smooth', block: 'center'})
  });
  navLinks[1].addEventListener("click", () => {
    skill.scrollIntoView({behavior: 'smooth', block: 'center'})
  });
  navLinks[2].addEventListener("click", () => {
    project.scrollIntoView({behavior: 'smooth', block: 'start'})
  });
  navLinks[3].addEventListener("click", () => {
    contact.scrollIntoView({behavior: 'smooth', block: 'start'})
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  })
}

init();

