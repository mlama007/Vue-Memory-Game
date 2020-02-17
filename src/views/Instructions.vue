<template>
  <div>
    <main class="main-instruction" id="main" tabindex="-1" aria-labelledby="instructionsTitle">
      <h2 id="instructionsTitle">Instructions</h2>
      <section>
        <h3>Rules</h3>
        <p>This is a memory Game. The cards are shuffled and faced down. The point of the game is to find all the matches; there are a total of 16 cards to match.</p>
        <ul class="list-instruct">
          <li v-for="(instruction, index) in instructions" :key="index">{{instruction}}</li>
        </ul>
      </section>
      <section>
        <h3>Scoring</h3>
        <ul class="list-instruct">
          <li v-for="(score, index) in scores" :key="index">
            <p class="star-category">{{score.value}} Stars</p>
            <span>{{score.description}}</span>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "Instructions",
  data() {
    return {
      instructions: [
        "Click on a card to flip it over.",
        "If the two cards match, they will remain flipped.",
        "If they don't match, they will be turned over.",
        "Remember what was on each card and where it was.",
        "The game is over when all the cards have been matched.",
        "Every flipped card counts as a move."
      ],
      scores: [
        { value: 3, description: "Win with 30 moves or less" },
        { value: 2, description: "Win with 40 moves or less" },
        { value: 1, description: "Win with 50 moves or less" }
      ]
    };
  }
};
</script>

<style lang='scss'>
.main-instruction {
  width: 80vw;
  max-width: 600px;
  margin: auto;
}
.list-instruct {
  list-style: none;
  padding: 0;
}
.star-category {
  font-weight: bold;
  margin-bottom: 0;
}
</style>
