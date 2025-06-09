// Завантаження меню з окремого HTML файлу
document.addEventListener("DOMContentLoaded", () => {
  // Завантаження шапки (хедера)
  fetch("menu.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header-container").innerHTML = html;

    highlightActiveMenuItem();
    if (typeof populatePage === "function") {
      populatePage();
    }
    checkUrlForCardScroll();

    // Тут додаємо логіка, яка працює з елементами меню після їх вставки
    const menu = document.getElementById('menu-container');
    const overlay = document.getElementById('menu-overlay');

    if (menu && overlay) {
      menu.classList.remove('active');
      overlay.classList.remove('active');

      overlay.addEventListener('click', () => toggleMenu(false));

      document.addEventListener('click', (e) => {
        const isMenuOpen = menu.classList.contains('active');
        const isClickInsideMenu = menu.contains(e.target);
        const isMenuToggle = e.target.closest('.menu-toggle');

        if (isMenuOpen && !isClickInsideMenu && !isMenuToggle) {
          toggleMenu(false);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu(false);
      });

      window.addEventListener('resize', () => {
        toggleMenu(false);
      });
    }
  })
  .catch((error) => console.error("Помилка завантаження шаблону меню:", error));

});

// Завантаження футера
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  });
// Кнопка "Нагору"
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.onscroll = function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.onclick = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Функція для перевірки URL на наявність фрагмента картки та прокрутки до неї
function checkUrlForCardScroll() {
  // Перевіряємо, чи є в URL хеш-фрагмент
  if (window.location.hash) {
    const cardId = window.location.hash.substring(1); // Отримуємо ідентифікатор без символу #

    // Перевіряємо, чи існує елемент з таким ID
    const targetElement = document.getElementById(cardId);
    if (targetElement) {
      // Затримка для того, щоб сторінка повністю завантажилась
      setTimeout(() => {
        // Прокручуємо до елемента з плавною анімацією
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Додаємо підсвічування для елемента на короткий час
        targetElement.classList.add('highlighted-card');
        setTimeout(() => {
          targetElement.classList.remove('highlighted-card');
        }, 3000);
      }, 500);
    }
  }
}

// Показ/сховування меню
function toggleMenu(force = null) {
  const menu = document.getElementById('menu-container');
  const overlay = document.getElementById('menu-overlay');

  const isActive = menu.classList.contains('active');
  const shouldShow = force !== null ? force : !isActive;

  if (shouldShow) {
    menu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // запобігаємо прокрутці основного контенту
  } else {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // відновлюємо прокрутку
  }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  // Переконаємось, що меню закрито при завантаженні
  const menu = document.getElementById('menu-container');
  const overlay = document.getElementById('menu-overlay');

  // Примусово закрити меню при старті
  menu.classList.remove('active');
  overlay.classList.remove('active');

  // Закриття по кліку на оверлей
  overlay.addEventListener('click', () => toggleMenu(false));

  // Закриття меню при кліку поза межами меню
  document.addEventListener('click', (e) => {
    const isMenuOpen = menu.classList.contains('active');
    const isClickInsideMenu = menu.contains(e.target);
    const isMenuToggle = e.target.closest('.menu-toggle');

    // Якщо меню відкрите і клік не всередині меню і не на кнопці відкриття меню
    if (isMenuOpen && !isClickInsideMenu && !isMenuToggle) {
      toggleMenu(false);
    }
  });

  // Закриття меню при натисканні Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  // Закриття меню при зміні розміру вікна
  window.addEventListener('resize', () => {
    toggleMenu(false);
  });
});

//Пошук
const searchData = [
  { title: 'Адаменко Валентин Васильович', url: 'People/Adamenko.html', cardId: 'Adamenko' },
  { title: 'Атрощенко Ф.Г', url: 'profesors.html', cardId: 'Atroschenko' },
  { title: 'Адаменко Валентин Васильович', url: 'People/Alexandrov.html', cardId:'Adamenko'},
  { title: 'Біб О.С. ', url: 'profesors.html', cardId: 'Bib' },
  { title: 'Білан С.А.', url: 'profesors.html', cardId: 'Bilan' },
  { title: 'Бовда М.І. ', url: 'profesors.html', cardId: 'Bovda' },
  { title: 'Бондар Олена Сергіївна', url: 'People/Bondar.html', cardId: 'Bondar' },
  { title: 'Боровик Василь Наумович ', url: 'People/Boletus.html', cardId: 'Boletus' },
  { title: 'Бударинін Вукола Петрович', url: 'People/Budarin.html', cardId: 'Budarin' },
  { title: 'Бударинін Вукола Петрович', url: 'People/Budarin.html' },
  { title: 'Буліч М.П.', url: 'profesors.html', cardId: 'Bulich' },
  { title: 'Вавильнюк Л.М.', url: 'profesors.html', cardId: 'Vavilnyuk' },
  { title: 'Вінниченко Євгеній Федорович', url: 'People/Vinnychenko.html', cardId: 'Vinnychenko' },
  { title: 'Вивальнюк Лука Миколайович', url: 'profesors.html', cardId: 'Vivalnyuk' },
  { title: 'Ганжа Микола Микитович', url: 'profesors.html', cardId: 'Ganzha' },
  { title: 'Гончаров С.Л.', url: 'profesors.html', cardId: 'Goncharov' },
  { title: 'Голубчик', url: 'People/Golubchik.html', cardId: 'Golubchik' },
  { title: 'Горошко Юрій Васильович', url: 'People/Horoshko.html', cardId: 'Horoshko' },
  { title: 'Гриценко Микола Іванович', url: 'People/Gritsenko.html', cardId: 'Hrytsenko' },
  { title: 'Дедович Валентин Миколайович', url: 'People/Dedovich.html', cardId: 'Dedovich' },
  { title: 'Дмитров В.С.', url: 'profesors.html', cardId: 'Dmitrov' },
  { title: 'Дятлов Юрій Володимирович', url: 'People/Dyatlov.html', cardId: 'Dyatlov' },
  { title: 'Євдокименко І.П.', url: 'profesors.html', cardId: 'Evdokimenko' },
  { title: 'Івенсен Сергій Миколайович', url: 'People/Evensen.html', cardId: 'Evensen' },
  { title: 'Ілляшенко Гурія Юхимович', url: 'People/Ilyashenko.html', cardId: 'Ilyashenko' },
  { title: 'Калита Євген Григорович', url: 'People/Kalita.html', cardId: 'Kalita' },
  { title: 'Карбовський А.В.', url: 'profesors.html', cardId: 'Karbovskiy' },
  { title: 'Карханін Іван Олексійович', url: 'People/Karkhanin.html', cardId: 'Karkhanin' },
  { title: 'Кислуха М.І.', url: 'profesors.html', cardId: 'Kisluha' },
  { title: 'Клиго К.І. ', url: 'profesors.html', cardId: 'Kligo' },
  { title: 'Кобло Лідія Миколаївна', url: 'profesors.html', cardId: 'Koblo' },
  { title: 'Кобзар О.О.', url: 'profesors.html', cardId: 'Kobzar' },
  { title: 'Коваль Іван Кирилович', url: 'People/Koval.html', cardId: 'Koval' },
  { title: 'Коновець М.К.', url: 'profesors.html', cardId: 'Konovets' },
  { title: 'Костюченко Андрій Олександрович', url: 'People/Kostyuchenko.html', cardId: 'Kostyuchenko' },
  { title: 'Кролевець Всеволод Степанович', url: 'People/Kroleyevts.html', cardId: 'Kroleyevts' },
  { title: 'Лисов Р.А. ', url: 'profesors.html', cardId: 'Lisov' },
  { title: 'Макаренко Н.Т.', url: 'profesors.html', cardId: 'Makarenko' },
  { title: 'Максимов В.Ф.', url: 'profesors.html', cardId: 'Maksimov' },
  { title: 'Марченко В.В.', url: 'profesors.html', cardId: 'Marchenko' },
  { title: 'Масол К.І.', url: 'profesors.html', cardId: 'Masol' },
  { title: 'Медвідь А.Г.', url: 'profesors.html', cardId: 'Medvid' },
  { title: 'Мошель Микола Васильович', url: 'People/Moshel.html', cardId: 'Moschel' },
  { title: 'Неаполітанський Сергій Аркадійович', url: 'People/Neapolitan.html', cardId: 'Neapolitan' },
  { title: 'Панізовский', url: 'People/Panizovsky.html', cardId: 'Panizovsky' },
  { title: 'Панченко Л.Б.', url: 'profesors.html', cardId: 'Panchenko' },
  { title: 'Павло Сергійович Александров', url: 'People/Alexandrov.html', cardId: 'Alexandrov' },
  { title: 'Панізовский', url: 'People/Panizovsky.html', cardId: 'Panizovsky' },
  { title: 'Пеньков Андрій Вікторович', url: 'People/Penkov.html', cardId: 'Penkov' },
  { title: 'Пономаренко В.І. ', url: 'profesors.html', cardId: 'Ponomarenko' },
  { title: 'Прядко Наталія Олександрівна', url: 'People/Pryadko.html', cardId: 'Pryadko' },
  { title: 'Пустовий Олег Миколайович', url: 'People/Pustovy.html', cardId: 'Pustovyy' },
  { title: 'Рафаловський Едуард Віталійович', url: 'People/Rafalovsky.html', cardId: 'Rafalovsky' },
  { title: 'Рогоза О.В.', url: 'profesors.html', cardId: 'Rogoza' },
  { title: 'Рохленко Р.М.', url: 'profesors.html', cardId: 'Rokhlenko' },
  { title: 'Руткевич Борис Михайлович', url: 'People/Rutkevych.html', cardId: 'Rutkevych' },
  { title: 'Рязанов О.І. ', url: 'profesors.html', cardId: 'Ryazanov' },
  { title: 'Рибалко Ф.С.', url: 'profesors.html', cardId: 'Ribalko' },
  { title: 'Савонов В.М.', url: 'profesors.html', cardId: 'Savonov' },
  { title: 'Садовничий Г.І. ', url: 'profesors.html', cardId: 'Sadovnichiy' },
  { title: 'Савченко Віталій Федорович', url: 'People/Savchenko.html', cardId: 'Savchenko' },
  { title: 'Севбо Володимир Іванович', url: 'People/Sevbo.html', cardId: 'Sevbo' },
  { title: 'Середній А.П.', url: 'profesors.html', cardId: 'Seredniy' },
  { title: 'Ситников О.П.', url: 'People/Sitnikov.html', cardId: 'Sitnikov' },
  { title: 'Скубенко Анатолій Федорович', url: 'People/Skubenko.html', cardId: 'Skubenko' },
  { title: 'Соколенко Олександр Іванович', url: 'People/Sokolenko.html', cardId: 'Sokolenko' },
  { title: 'Степко І.І.', url: 'profesors.html', cardId: 'Stepko' },
  { title: 'Шкардибарда Аліна Анатоліївна', url: 'profesors.html', cardId: 'Shkardibarda' },
  { title: 'Шморгун А.В.', url: 'profesors.html', cardId: 'Shmorgun' },
  { title: 'Шепета О.М.', url: 'profesors.html', cardId: 'Whisper' },
  { title: 'Штепа М.І.', url: 'profesors.html', cardId: 'Steppe' },
  { title: 'Щербина І.М.', url: 'profesors.html', cardId: 'Shcherbyna' },
  { title: 'Файзулліна Тетяна Володимирівна', url: 'profesors.html', cardId: 'Faizullina' },
  { title: 'Фурсенко Володимир Борисович', url: 'profesors.html', cardId: 'Fursenko' },
  { title: 'Черкасова В.А.', url: 'profesors.html', cardId: 'Cherkasova' },
  { title: 'Чорноус Василь Устинович', url: 'People/Chornous.html', cardId: 'Chornous' },
  { title: 'Цибко Ганна Юхимівна', url: 'People/Tsibko.html', cardId: 'Tsibko' },
  { title: 'Цибуля В.В.', url: 'profesors.html', cardId: 'Tsybulya' },
  { title: 'Твердохлібов В.І.', url: 'profesors.html', cardId: 'Tverdokhlibov' },
  { title: 'Харичків М.Г.', url: 'profesors.html', cardId: 'Harichkiv' },
  { title: 'Хатюков С.А', url: 'profesors.html', cardId: 'Khatyukov' },
];

// DOM елементи
const searchOverlay = document.getElementById('search-overlay');
const mobileSearchInput = document.getElementById('mobile-search-input');
const mobileSearchButton = document.getElementById('mobile-search-button');
const mobileSearchResults = document.getElementById('mobile-search-results');
const mobileClearButton = document.getElementById('mobile-clear-search');
const desktopSearchInput = document.getElementById('desktop-search-input');
const desktopSearchButton = document.getElementById('desktop-search-button');
const desktopSearchResults = document.getElementById('desktop-search-results');
const desktopClearButton = document.getElementById('desktop-clear-search');

// Утилітарні функції
function highlight(text, term) {
  if (!term || term.trim() === '') return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function findMatches(query) {
  const trimmed = query.trim().toLowerCase();
  return searchData.filter(item =>
    item.title.toLowerCase().includes(trimmed)
  );
}

function createUrl(item) {
  // Якщо є cardId, додаємо його як фрагмент URL
  if (item.cardId) {
    return `${item.url}#${item.cardId}`;
  }
  return item.url;
}

function showResults(resultsElement, matches, query) {
  if (matches.length === 0) {
    return false;
  }

  resultsElement.innerHTML = `<div class="list-group">
    ${matches.map(item =>
    `<a href="${createUrl(item)}" class="list-group-item list-group-item-action">
        <h5>${highlight(item.title, query)}</h5>
      </a>`
  ).join('')}
  </div>`;
  return true;
}

function showMessage(element, message, duration = 4000) {
  element.innerHTML = `<div class="alert alert-warning">${message}</div>`;

  setTimeout(() => {
    if (element && element.querySelector('.alert')) {
      element.innerHTML = '';
    }
  }, duration);
}

// Управління пошуком
function toggleSearch() {
  searchOverlay.style.display = 'flex';
  mobileSearchInput.focus();
}

function closeSearch() {
  searchOverlay.style.display = 'none';
  mobileSearchInput.value = '';
  mobileSearchResults.innerHTML = '';
  mobileClearButton.style.display = 'none';
}

function performSearch(input, resultsElement) {
  const query = input.value.trim();

  if (query.length < 2) {
    showMessage(resultsElement, 'Введіть щонайменше 2 символи для пошуку');
    return;
  }

  const matches = findMatches(query);

  if (!showResults(resultsElement, matches, query)) {
    showMessage(resultsElement, `Нічого не знайдено за запитом "${query}"`);
  }
}

function clearInput(input, resultsElement, clearButton) {
  input.value = '';
  resultsElement.innerHTML = '';
  clearButton.style.display = 'none';
  input.focus();
}

// Обробники подій
searchOverlay.addEventListener('click', (e) => {
  if (e.target === searchOverlay) {
    closeSearch();
  }
});

// Мобільний пошук
mobileSearchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  mobileClearButton.style.display = query.length > 0 ? 'block' : 'none';

  if (query.length >= 2) {
    const matches = findMatches(query);
    showResults(mobileSearchResults, matches, query);
  } else {
    mobileSearchResults.innerHTML = '';
  }
});

mobileSearchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    performSearch(mobileSearchInput, mobileSearchResults);
  } else if (e.key === 'Escape') {
    closeSearch();
  }
});

mobileSearchButton.addEventListener('click', () => {
  performSearch(mobileSearchInput, mobileSearchResults);
});

mobileClearButton.addEventListener('click', () => {
  clearInput(mobileSearchInput, mobileSearchResults, mobileClearButton);
});

// Десктопний пошук
desktopSearchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  desktopClearButton.style.display = query.length > 0 ? 'block' : 'none';

  if (query.length >= 2) {
    const matches = findMatches(query);
    showResults(desktopSearchResults, matches, query);
  } else {
    desktopSearchResults.innerHTML = '';
  }
});

desktopSearchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    performSearch(desktopSearchInput, desktopSearchResults);
  }
});

desktopSearchButton.addEventListener('click', () => {
  performSearch(desktopSearchInput, desktopSearchResults);
});

desktopClearButton.addEventListener('click', () => {
  clearInput(desktopSearchInput, desktopSearchResults, desktopClearButton);
});

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  searchOverlay.style.display = 'none';

  // Додаємо стилі для підсвічування карток
  const style = document.createElement('style');
  style.textContent = `
    .highlighted-card {
      animation: highlight-pulse 3s;
    }
    
    @keyframes highlight-pulse {
      0% { box-shadow: 0 0 0 0 rgba(66, 139, 202, 0.7); }
      50% { box-shadow: 0 0 0 20px rgba(66, 139, 202, 0); }
      100% { box-shadow: 0 0 0 0 rgba(66, 139, 202, 0); }
    }
  `;
  document.head.appendChild(style);
});