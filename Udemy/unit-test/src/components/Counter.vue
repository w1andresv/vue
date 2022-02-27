<template>
  <h2>{{ title }}</h2>
  <p data-testid="subtitle">Pruebas de {{ title }}!!</p>
  <p>{{ counter }} <sup>2</sup> ={{ squareCounter }}</p>
  <p data-testid="count">{{ counter }}</p>
  <button data-testid="+1" @click="increse">+1</button>
  <button data-testid="-1" @click="decrese">-1</button>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Counter",
    },
    start: {
      type: Number,
      default: 7,
      validator(value) {
        return value >= 0;
      },
      // required: true
    },
  },
  name: "AppCounter",
  data() {
    return {
      counter: this.start,
    };
  },
  methods: {
    increse() {
      this.counter++;
    },
    decrese() {
      this.counter--;
    },
  },
  computed: {
    squareCounter() {
      return this.counter * this.counter;
    },
    // defaultTitle(){
    //   return this.title||'Counter'
    // }
  },
};
</script>

<style>
button {
  background-color: #64b687;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}
button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}
</style>
