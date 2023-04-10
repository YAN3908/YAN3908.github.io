const langArr = {
    "unit" :  {
        "ru": "Централизованные системы смазки",
        "en": "Centralized lubrication systems",
        "uk": "Централізовані системи змащення",
        "fr": "Systèmes de lubrification centralisée"
    },
    "chip": {
        "ru": "графический чип",
        "en": "graphics processing unit",
        "uk": "графічний чіп",
    },
    "memory": {
        "ru": "объем памяти",
        "en": "memory size",
        "uk": "oбсяг пам'яті",
    },

}


function changeBrouzerLanguage() {
var userLang = navigator.language || navigator.userLanguage;
<!--console.log(userLang);-->
location.href = window.location.pathname + '#' + userLang.slice(0, 2);
}
        if (!window.location.hash) {
            changeBrouzerLanguage();
        }


  $('.my-carousel').carousel().swipeCarousel({
  // options here
});
const select = document.querySelector('select');
const allLang = ['en', 'ru', 'uk', 'fr'];

select.addEventListener('change', changeURLLanguage);

// перенаправить на url с указанием языка
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;

    hash = hash.substr(1);
<!--    console.log(hash);-->
        if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
        }
        select.value = hash;

var elements = document.querySelectorAll('.a-lang');
elements.forEach(element => element.href += '#' + hash);


        document.querySelector('title').innerHTML = langArr['unit'][hash];
        document.documentElement.setAttribute('lang', hash)
        document.querySelector('.lng-unit').innerHTML = langArr['unit'][hash];
           for (let key in langArrText) {
        let elem = document.querySelector('.' + key);
        if (elem) {
            elem.innerHTML = langArrText[key][hash];
        }
        }
    }
changeLanguage();