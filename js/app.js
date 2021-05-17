// BUTTON_NAV
var nav_button = document.querySelector('.nav_button_div');
var nav_menu = document.querySelector('.nav');
var black_nav = document.querySelector('.black_header');
var open_menu = false;



// NAVIGATION BUTTON 
nav_button.addEventListener('click', () => {
    if (!open_menu) {
        black_nav.classList.add('black_header_nav_open');
        nav_menu.classList.add('nav_menu_open')
        nav_button.classList.add('open')
        open_menu = true;
    } else {
        black_nav.classList.remove('black_header_nav_open');

        nav_menu.classList.remove('nav_menu_open')
        nav_button.classList.remove('open')
        open_menu = false;

    }
})

const date = new Date();
current_month=date.getMonth();
const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".month_days");

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay() - 1;

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex;

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ]

    document.querySelector(".head_calendar h1").innerHTML = months[date.getMonth()];


    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            days += `<div class="month_day today selected_day">${i}</div>`;
            current_day=i;
        } else {
            days += `<div class="month_day">${i}</div>`;
        }
    }// основные дни месяца

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }
    monthDays.innerHTML = days;//выход в html

    const prev_dates = document.querySelectorAll('.prev-date');
    const next_dates = document.querySelectorAll('.next-date');
    const monthDaydivs = document.querySelectorAll('.month_day');
    function clearClasses() {
        for (let i = 0; i < monthDaydivs.length; i++) {
            monthDaydivs[i].classList.remove('selected_day');
        }
    }//Очиститель выделенных дней

    for (let i = 0; i < prev_dates.length; i++) {
        prev_dates[i].addEventListener('click', () => {
            date.setMonth(date.getMonth() - 1);
            renderCalendar();
            clearClasses();

            var indexI=prev_dates.length-i;
            console.log(indexI);
            monthDaydivs[monthDaydivs.length-indexI].classList.add('selected_day');            
            console.log(monthDaydivs[monthDaydivs.length-indexI]);

        })
    }
    for (let i = 0; i < next_dates.length; i++) {
        next_dates[i].addEventListener('click', () => {
            date.setMonth(date.getMonth() + 1);
            renderCalendar();
        })
    }//переход на след\пред месяц по клику на соседние числа


    var week_days_timetable = [
        
        "<p>11:00</p><p>Общецерковное собрание</p><p>15:00</p><p>Молодежное служение</p>",
        "<p>19:00</p><p>Сет за молодеж</p>",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август"
    ]
    function setDefaultTimetable() {
        if (current_month == date.getMonth()) {
            document.querySelector('.timetable_calendar').innerHTML = "";
            document.querySelector('.timetable_calendar').innerHTML += week_days_timetable[(firstDayIndex + current_day) % 7];
        }
    }
    setDefaultTimetable();
    function clearTimetable() {
        document.querySelector('.timetable_calendar').innerHTML = "";

    }


    for (let i = 0; i < monthDaydivs.length; i++) {
        monthDaydivs[i].addEventListener('click', () => {
            clearClasses();
            monthDaydivs[i].classList.add('selected_day');
            for (let j = 0; j<7; j++ ){
                if ((firstDayIndex+Number(monthDaydivs[i].innerHTML))%7==j){
                    clearTimetable();
                    document.querySelector('.timetable_calendar').innerHTML +=week_days_timetable[(firstDayIndex+Number(monthDaydivs[i].innerHTML))%7];
                }
                // else{
                //     document.querySelector('.timetable_calendar p').remove();

                // }
            }
        })
    }//Выделение по клику + вывод расписания дня
    
    
};
renderCalendar();

document.querySelector(".calendar_button-prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});//левый клик

document.querySelector(".calendar_button-next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});//правый клик

