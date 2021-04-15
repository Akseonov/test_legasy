let catalog = [
  {
    name: "Мойки",
    items: [
      {
        name: "Ulgran",
        items: [
          {
            id: 1,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 450
          },
          {
            id: 2,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 350
          },
        ],
      },
      {
        name: "Virgo Mramor",
        items: [
          {
            id: 1,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 600
          },
          {
            id: 2,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 750
          },
        ],
      },
      {
        name: "Handmade",
        items: [
          {
            id: 1,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 100
          },
          {
            id: 2,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 150
          },
        ],
      },
    ],
  },
  {
    name: "Фильтры",
    items: [
      {
        name: "Ulgran",
        items: [
          {
            id: 1,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 20
          },
          {
            id: 2,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 12
          },
        ],
      },
      {
        name: "Virgo Mramor",
        items: [
          {
            id: 1,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 10
          },
          {
            id: 2,
            name: "thms",
            img: "sfmsfmf/sfsef.png",
            price: 5
          },
        ],
      },
    ]
  }
];

const menu = {
  catalog: [],
  container: null,

  /**
   * Инициализация каталога
   */
  init() {
    this.catalog = catalog;
    this.container = document.querySelector('#menu');
    this._render();
    this._handleActions();
  },

  /**
   *
   * Полное прохождение объекта и сборка HTML
   *
   * @param $str {string} - строка в которую собирается HTML
   * @param arr - объект для прохождения
   * @return {string} - строку с HTML каталогом
   * @private
   */
  _passing($str, arr) {
    $str += '<ul>';

    arr.forEach(el => {
      if (el.items) {
        $str += `<li class="menu__arrow">${el.name}`;
        $str = this._passing($str, el.items);
      } else {
        $str += `<li>${el.name}`;
        $str += '</li>';
      }
    });
    return $str += '</ul>';
  },

  /**
   * Отрисовка и вывод каталога
   *
   * @private
   */
  _render() {
    let $str = `<ul>
        <li class="menu__arrow">каталог товаров`;
    $str = this._passing($str, this.catalog);
    this.container.innerHTML = $str + '</li></ul>';
  },

  /**
   * Объявление событий на разделы каталога
   *
   * @private
   */
  _handleActions() {
    this.container.addEventListener('click', evt => {
      if (evt.target.childNodes[1]) {
        evt.target.childNodes[1].classList.toggle("menu__close");
        evt.target.classList.toggle("menu__arrow");
      }
    })
  },
};

menu.init();