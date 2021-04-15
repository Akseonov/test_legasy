<template>
  <div class="col-12 col-md-6 col-xl-4">
    <div class="products__item col-12">
      <a href="#">
        <img :src="value.img" alt="photo_item_1" class="item__img">
      </a>
      <a href="#">
        <h2 class="item__name">{{value.name}}Копченая паприка Santa Maria, 230г</h2>
      </a>
      <div class="item__box">
        <h3 :class="[value.sale === value.price ? unvisibleClass : '', saleClass]">{{value.sale}} р.</h3>
        <h4 class="item__price">{{value.price}} р.</h4>
      </div>
      <div class="item__interaction">
        <div class="item__count">
          <button class="item__down" @click.prevent="redValue">-</button>
          <label>
            <input type="number" :value="countItem" class="item__input" id="1">
          </label>
          <button class="item__up" @click.prevent="incValue">+</button>
        </div>
        <button class="item__button" @click.prevent="$emit('add',value,countItem)">В корзину</button>
      </div>
    </div>
  </div>
</template>
<!--@click.prevent="$parent.$emit('add', item)"-->
<script>
  export default {
    name: "item",
    props: {
      value: {type: Object},
    },
    data() {
      return {
        saleClass: 'item__sale',
        unvisibleClass: 'item__sale_no',
        countItem: 1,
      }
    },
    methods: {
      incValue() {
        this.countItem++;
      },
      redValue() {
        this.countItem--;
      },
    }
  }
</script>

<style lang="sass">

</style>