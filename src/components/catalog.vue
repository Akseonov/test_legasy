<template>
  <div>
    <div v-show="visible" class="message"><p>{{message}}</p><button @click.prevent="toggle">ok</button></div>
    <div class="products container size p-0">
      <div class="row justify-content-between">
        <item
          v-for="item of itemsCatalog"
          :value="item"
          :key="item.id"
          @add="addItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import item from './item.vue';

  export default {
    name: "catalog",
    components: {
      'item': item,
    },
    data() {
      return {
        urlCatalog: "/api/catalog",
        urlCart: "/api/cart",
        itemsCatalog: [],
        itemsCart: [],
        visible: false,
        message: "",
      }
    },
    methods: {
      toggle() {
        this.visible = !this.visible;
      },
      addItem(item, count) {
        let find = this.itemsCart.find(el => el.id === +item.id);

        if (!find) {
          const obj = {
            id: +item.id,
            name: item.name,
            price: +item.price,
            amount: count,
            img: item.img,
          };

          fetch(this.urlCart, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
          })
            .then(res => res.json())
            .then(res => {
              if (res) {
                this.itemsCart.push(obj);
                this.toggle();
                this.message = `Товар ${obj.name} отправлен в корзину в количестве ${obj.amount} шт.`;
              }
            })
            .catch( err => {
                console.log(err);
                this.toggle();
                this.message = 'Ошибка';
              }
            );
        } else {
          fetch(`${this.urlCart}/${find.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value: count }),
          })
            .then(status => status.json())
            .then(res => {
              if (res) {
                find.amount += count;
                this.toggle();
                this.message = `Товар ${find.name} отправлен в корзину в количестве ${count} шт.`;
              }
            })
            .catch( err => {
              console.log(err);
              this.toggle();
              this.message = 'Ошибка';
            });
        }
      },
    },
    mounted() {
      fetch(this.urlCatalog)
        .then(items => items.json())
        .then(items => {
          this.itemsCatalog = items;
        });
      fetch(this.urlCart)
        .then(items => items.json())
        .then(items => {
          this.itemsCart = items.contents;
        });
    }
  }
</script>

<style scoped>

</style>