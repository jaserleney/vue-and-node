<template>
  <img v-if="img" :src="img" alt="bg" />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input v-model="question" type="text" placeholder="Hazme una pregunta" />
    <p>Recuerda terminar con un signo de interrogacion (?)</p>
    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Indecision",
  data() {
    return {
      question: null,
      answer: null,
      img: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = "Pensando...";

        const { answer, image } = await fetch(`https://yesno.wtf/api`).then((res) => res.json());

        this.answer = answer === "yes" ? "Sí" : "No";
        this.img = image;
      } catch (err) {
        console.log("IndecisionComponent", err);
        this.answer = "No se cargo del API";
        this.img = null;
      }
    },
  },
  watch: {
    question(value, oldValue) {
      this.isValidQuestion = false;

      console.log({ value });

      if (!value.includes("?")) return;

      this.isValidQuestion = true;

      // TODO: Realizar petion http
      this.getAnswer();
    },
  },
};
</script>

decision.html
<style>
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
