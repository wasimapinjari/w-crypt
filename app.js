const hero = document.querySelector(".hero-section");

var obs = new IntersectionObserver(
  function(entries) {
  const ent = entries[0];
  console.log(ent);
  if(ent.isIntersecting === false) {
    document.querySelector(".header").classList.add("sticky");
    hero.classList.add("top-padding");
  }
  else {
    document.querySelector(".header").classList.remove("sticky");
    hero.classList.remove("top-padding");
  } 
}, {
  root: null,
  threshold: 0,
  rootMargin: "-118px"
});

obs.observe(hero);


const navButtons = document.querySelector(".nav-icon");
const navIcon = document.querySelector(".nav-icon-close");
const header = document.querySelector(".header");
const html = document.querySelector("html");

function eventToggle() {
  header.classList.add("nav-open");
  navIcon.style.zIndex = 1500;
  obs.unobserve(hero);
  document.querySelector(".header").classList.add("sticky");
  hero.classList.add("top-padding");
}

function eventToggle2() {
  navIcon.style.zIndex = 500;
  header.classList.remove("nav-open");
  obs.observe(hero);
}

navButtons.addEventListener("click", eventToggle);

navIcon.addEventListener("click", eventToggle2);


function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();