let $ = require("jquery");

import "./styles/style.less";
import 'slick-carousel/slick/slick.min';

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

