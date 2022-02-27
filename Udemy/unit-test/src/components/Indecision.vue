<template>
  <h1>Indecision!!</h1>

  <img :src="image"/>
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Hazme una pregunta" v-model="question"/>
    <p>Recuerda terminar con un signo de interrogación (?).</p>

    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer === 'yes' ? 'SI' : 'NO' }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-indecision",
  data() {
    return {
      question: "Hola",
      answer: null,
      image: 'https://via.placeholder.com/500/000000/?text=-_-',
      isValidQuestion: Boolean
    };
  },
  methods: {
    async getAnswer() {
      this.answer = 'Pensando...';
      const {answer, image} = await fetch('https://yesno.wtf/api').then(r => r.json());
      this.answer = answer;
      this.image = image;
    }
  },
  watch: {
    question(value, oldValue) {
      this.isValidQuestion = false;
      if (!value.includes('?')) return;
      oldValue;
      this.isValidQuestion = true;
      this.getAnswer()
    },
  },
};
</script>

<style scope>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}

input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
