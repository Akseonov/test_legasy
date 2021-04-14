const cart = {
  url: '/api/cart',
  container: null,
  items: [],
  containerMessage: null,
  containerMessageP: null,

  init() {
    this.getItem();
    this.container = document.querySelector(".products");
    this.containerMessage = document.querySelector("#message");
    this.containerMessageP = document.querySelector("#message__p");
    this._handleActions();
  },

  addItem(item, value) {
    let find = this.items.find(el => el.id === +item.id);

    if (!find) {
      const obj = {
        id: +item.id,
        name: item.name,
        price: +item.price,
        amount: value,
        img: item.img,
      };

      fetch(this.url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            this.items.push(obj);
            this.containerMessage.classList.remove("message__no");
            this.containerMessageP.innerHTML = `Товар ${obj.name} отправлен в корзину в количестве ${obj.amount} шт.`;
          }
        })
        .catch( err => {
          console.log(err);
          this.containerMessage.classList.remove("message__no");
          this.containerMessageP.innerHTML = 'Ошибка';
        }
      );
    } else {
      fetch(`${this.url}/${find.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      })
        .then(status => status.json())
        .then(res => {
          if (res) {
            find.amount += value;
            this.containerMessage.classList.remove("message__no");
            this.containerMessageP.innerHTML = `Товар ${find.name} отправлен в корзину в количестве ${value} шт.`;
          }
        })
        .catch( err => {
          console.log(err);
          this.containerMessage.classList.remove("message__no");
          this.containerMessageP.innerHTML = 'Ошибка';
        });
    }
  },

  _handleActions() {
    this.container.addEventListener('click', evt => {
      if( evt.target.classList.contains('item__button')) {
        this.addItem(evt.target.dataset, +evt.target.parentElement.querySelector('.item__input').value);
      }
    });
    this.containerMessage.addEventListener('click', evt => {
      evt.target.parentElement.classList.toggle("message__no");
    });
  },

  getItem() {
    fetch(this.url)
      .then(items => items.json())
      .then(items => {
        this.items = items.contents;
        console.log(this.items);
    });
  },
};

export default cart;