let $ = require("jquery");

import "./styles/style.less";
import 'slick-carousel/slick/slick.min'


function importAll(r) {
    return r.keys().map(r);
}

const images_ = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));


let fixedElement = document.getElementById('fixedElement');
let parent = fixedElement.parentNode;
let heightFixedElement = parseInt(getComputedStyle(fixedElement).height);

window.addEventListener('scroll', () => {
    let positionYParent = parent.getBoundingClientRect().top;
    let positionYParentBottom = parent.getBoundingClientRect().bottom;

    if (positionYParent >= 0) {
        fixedElement.classList.remove('aside-banner__background_fixed');
    } else {
        fixedElement.classList.add('aside-banner__background_fixed');
        fixedElement.classList.remove('aside-banner__background_absolute');
    }
    if (positionYParentBottom - 300 <= 0) {
        fixedElement.classList.remove('aside-banner__background_fixed');
        fixedElement.classList.add('aside-banner__background_absolute');
    }
});

let mainMenu = document.getElementById('mainMenu');
let menuBtn = document.getElementById('menuBtn');

menuBtn.addEventListener('click', showMenu);

function showMenu() {
    mainMenu.classList.toggle('close');
}

let showMoreBtn = document.getElementById('showMoreBtn');
let columnContainer = document.getElementById('columnContainer');
let firstContainer = document.getElementById('firstContainer');

showMoreBtn.addEventListener('click', showMoreEvents);

let increment = 0;

function showMoreEvents() {
    increment++;
    let height = parseInt(getComputedStyle(columnContainer).height);
    height += 360;
    columnContainer.style.height = height + "px";
    firstContainer.style.height = height + "px";
    showMoreBtn.scrollIntoView(false);
    if (increment === 4) {
        showMoreBtn.innerHTML = "Спрятать";
        showMoreBtn.removeEventListener('click', showMoreEvents);
        showMoreBtn.addEventListener('click', hideMoreEvents)

    }
}

function hideMoreEvents() {
    increment--;
    let height = parseInt(getComputedStyle(columnContainer).height);
    height -= 360;
    columnContainer.style.height = height + "px";
    firstContainer.style.height = height + "px";
    showMoreBtn.scrollIntoView(false);
    if (increment === 0) {
        showMoreBtn.innerHTML = "Показать еще";
        showMoreBtn.removeEventListener('click', hideMoreEvents);
        showMoreBtn.addEventListener('click', showMoreEvents);
    }
}

let arrowBack = document.getElementById('arrowBack');
arrowBack.addEventListener('click', scrollTop);

function scrollTop() {
    window.scrollTo(0, 0);
}






















