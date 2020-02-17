<template>
  <section class="win">
    <div>
      <h2 id="congratulations">Congratulations!</h2>
      <ul class="stars">
        <li v-for="(star, index) in stars" :key="index">
          <i :class="`${index} fa fa-star`"></i>
        </li>
      </ul>
      <p id="winningMsg">{{winningMessage}}</p>
      <button class="buttonGray" @click="newGame()">Play again</button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Winning",
  props: {
    newGame: { type: Function },
    winningMessage: {type: String}
  },
  computed: {
    ...mapState([
      "stars"
    ])
  }
};
</script>

<style lang="scss">
/* if you win */
.win {
  text-align: center;
  padding: auto;
  margin: auto;
}
.win h1 {
  font-weight: bold;
}
.win .stars {
  margin: 0;
  padding: 0;
  display: inline-block;
  margin: 0 5px 0 0;
}

.win .stars li {
  list-style: none;
  display: inline-block;
}
.win p {
  padding: 3em;
}
</style>
