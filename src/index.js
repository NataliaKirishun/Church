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


//getting information about new events from the server

let eventsArray;

$.ajax({
    url: "../bd.json"
})
    .done(function (response) {
        eventsArray = response.events;
        let sliderWrapper = document.querySelector('.slider-wrapper');
        let slider = createSlider(eventsArray);
        sliderWrapper.prepend(slider);

        $('.slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            focusOnSelect: true,
            variableWidth: true,
            dots: true,
            appendDots: $('.calendar'),
            prevArrow: $('.slick-prev'),
            nextArrow: $('.slick-next')
        });


        let $arrayOfDots = $("li[role='presentation']");
        let currentMonth;
        let dotsParent=document.querySelector('.slick-dots');
        $.each($arrayOfDots, function (index, value) {
            value.firstChild.innerHTML=eventsArray[index].date.number;
            if (eventsArray[index].date.month !== currentMonth) {
                let span=document.createElement('span');
                currentMonth=eventsArray[index].date.month;
                span.innerHTML=currentMonth;
                value.insertBefore(span,value.firstChild);
                value.style.width='80px';
                span.style.marginRight='10px';
                span.setAttribute('disabled', 'true');
            }
        })
    });

function checkCurrent() {
    let currentDate = $(this)[0].classList[1];
    $('.slider__item').removeClass('slick-current slick-active slick-center');
    $(`.slider__item` + `.` + `${currentDate}`).addClass('slick-current slick-active slick-center');
    // console.log( $(`.slider__item`+`.`+`${currentDate}`));
}


function highlightCurrent() {
    let currentClass = document.querySelector('.slick-current').classList[1];
    let currentCalendarItem = $('.calendar__wrapper').find(`.` + `${currentClass}`);
    currentCalendarItem.addClass('highlight');
}

function createSlider(array) {
    let fragment = '<div class="past-events__item">\n' +
        '           <div class="date">\n' +
        '           <span class="date__number"></span>\n' +
        '           <span class="date__block">\n' +
        '           <span class="date__month"></span>\n' +
        '           <span class="date__year"></span>\n' +
        '           </span>\n' +
        '           </div>\n' +
        '           <h4 class="past-events__header"></h4>\n' +
        '       <span class="past-events__description"></span>\n' +
        '       </div>\n' +
        '       <span class="slick-prev">&#8592;</span><span class="slick-next">&#8594;</span>\n' +
        '       <img class="slider__img" src="">';

    let slider = document.createElement('div');
    slider.className = 'slider';
    array.forEach((item, i) => {
        let sliderItem = document.createElement('div');
        sliderItem.classList.add('slider__item', `item_${i}`);
        sliderItem.innerHTML = fragment;
        slider.appendChild(sliderItem);
        sliderItem.querySelector('.date__number').innerHTML = item.date.number;
        sliderItem.querySelector('.date__month').innerHTML = item.date.month;
        sliderItem.querySelector('.date__year').innerHTML = item.date.year;
        sliderItem.querySelector('.past-events__header').innerHTML = item.title;
        sliderItem.querySelector('.past-events__description').innerHTML = item.text;
        sliderItem.querySelector('.slider__img').src = item.imgUrl;
    });
    return slider;
}

function createCalendar(array) {
    let calendarWrapper = document.querySelector('.calendar__wrapper');
    let prevMonth;
    array.forEach((item, index) => {
        let currentMonth = item.date.month;
        if (currentMonth !== prevMonth) {
            prevMonth = currentMonth;

            let monthSpan = document.createElement('span');
            monthSpan.className = 'calendar__month';
            monthSpan.innerHTML = currentMonth;

            let dataSpan = createDataItem(item.date.number, index);
            calendarWrapper.append(monthSpan, dataSpan);
        } else {
            let dataSpan = createDataItem(item.date.number, index);
            calendarWrapper.append(dataSpan);
        }
    });

}

function createDataItem(number, i) {
    let dataSpan = document.createElement('span');
    dataSpan.classList.add('calendar__day', `item_${i}`);
    dataSpan.innerHTML = number;
    return dataSpan;
}



















