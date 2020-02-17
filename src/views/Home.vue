<template>
  <div class="home" aria-label="Memory Game Board">
    <p role="status">{{gameAnnounce}}</p>
    <Winning v-if="win" :newGame="newGame" :winningMessage="winningMessage"></Winning>
    <main class="container" v-else id="main" tabindex="-1" aria-labelledby="gameTitle">
      <h2 id="gameTitle">Game Board</h2>
      <section aria-label="Memory Game Controller" class="gameController">
        <button @click="newGame" class="restart buttonGray">
          <i class="fa fa-repeat"></i>
          <span class="reset">Reset</span>
        </button>
        <div>
          <ul class="stars" :aria-label="stars + ' stars left'">
            <li v-for="(star, index) in stars" :key="index" class="star">
              <i :class="`${index} fa fa-star`"></i>
            </li>
          </ul>
          <p class="moves">Moves: {{numMoves}}</p>
        </div>
      </section>

      <section aria-label="Memory Game Board" id="cards">
        <p id="gameUpdate">{{gameUpdate}}</p>
        <ul class="cards">
          <li
            v-for="(card, index) in this.deck.cards"
            :key="index"
            :aria-label="[ card.flipped ? card.name : '']"
            class="cardItem"
          >
            <!-- {{card.name}} -->
            <button
              aria-describedby="gameUpdate"
              :aria-label="[ card.flipped ? card.name + ' flipped' : 'card ' + (index+1)]"
              :class="[ card.match ? 'card match' : card.flipped ? 'card show' : card.close ? 'card close' : 'card']"
              @click="flipCard(card)"
              :disabled="card.match"
            >
              <span v-if="!card.flipped">?</span>
              <div v-else :class="deck.cards[index].icon"></div>
            </button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Winning from "@/components/Winning.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Winning
  },
  computed: {
    ...mapState([
      "gameAnnounce",
      "win",
      "stars",
      "cardsFlipped",
      "numCardsFlipped",
      "numMoves",
      "cardsMatched",
      "types"
    ]),
    ...mapGetters(["gameUpdate", "deck", "winningMessage"])
  },
  created() {
    this.shuffle(this.deck.cards);
  },
  methods: {
    ...mapActions([
      "clearGame",
      "updateDeck",
      "update_Win",
      "update_Stars",
      "clear_CardsFlipped",
      "update_CardsFlipped",
      "update_NumCardsFlipped",
      "update_NumMoves",
      "clear_CardsMatched",
      "update_CardsMatched",
      "update_GameAnnounce"
    ]),
    shuffle(cards) {
      this.deck.cards = [];
      var currentIndex = cards.length,
        temporaryValue,
        randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }

      this.deck.cards = cards;
    },
    newGame() {
      this.shuffle(this.deck.cards);

      for (let i = 0; i < this.deck.cards.length; i++) {
        this.deck.cards[i].flipped = false;
        this.deck.cards[i].close = false;
        this.deck.cards[i].match = false;
      }

      this.clearGame();
    },

    flipCard(card) {
      this.update_GameAnnounce({ message: "" });
      if (card.flipped) {
        this.update_GameAnnounce({
          message: "Card already flipped."
        });
        return;
      } else {
        this.update_NumMoves({ moves: this.numMoves + 1 });
        if (this.numMoves < 30) {
          this.update_Stars({ num: 3 });
        } else if (this.numMoves < 40) {
          this.update_Stars({ num: 2 });
        } else if (this.numMoves < 50) {
          this.update_Stars({ num: 1 });
        } else if (this.numMoves > 50) {
          this.update_Stars({ num: 0 });
        }
      }
      // only allow flips if there are < or = 2 flipped cards
      if (this.numCardsFlipped < 2) {
        if (this.numCardsFlipped < 1) {
          this.update_GameAnnounce({
            message: card.name + " flipped."
          });
        }
        card.flipped = true;
        this.update_NumCardsFlipped({ num: this.numCardsFlipped + 1 });
        this.update_CardsFlipped({ cards: card });
        // MATCH
        if (
          this.numCardsFlipped === 2 &&
          this.cardsFlipped[0].name == this.cardsFlipped[1].name
        ) {
          let matchesRemaining =
            this.deck.cards.length / 2 - this.cardsMatched.length - 1;
          for (let i = 0; i < this.deck.cards.length; i++) {
            if (this.deck.cards[i].name == this.cardsFlipped[0].name) {
              this.deck.cards[i].match = true;
            }
            this.update_GameAnnounce({
              message:
                card.name +
                " flipped. Match found! " +
                matchesRemaining +
                " matches left!"
            });
          }
          this.update_CardsMatched({ cards: this.cardsFlipped });
          this.clear_CardsFlipped({ cards: [] });
          this.update_NumCardsFlipped({ num: 0 });
          //if number of cards matched = number or cards, then win the game
          if (this.cardsMatched.length === this.deck.cards.length / 2) {
            this.update_Win({ win: true });
            this.update_GameAnnounce({
              message: this.winningMessage
            });
          }
        }
        // NO MATCH
        else if (
          this.numCardsFlipped === 2 &&
          this.cardsFlipped[0].name !== this.cardsFlipped[1].name
        ) {
          // Wait before closing mismatched card
          this.update_GameAnnounce({
            message: card.name + " flipped. No match."
          });
          setTimeout(() => {
            for (let i = 0; i < this.deck.cards.length; i++) {
              if (this.deck.cards[i].flipped && !this.deck.cards[i].match) {
                this.deck.cards[i].flipped = false;
                this.deck.cards[i].close = true;
              }
            }
            this.clear_CardsFlipped({ cards: [] });
            this.update_NumCardsFlipped({ num: 0 });
            return;
          }, 900);
        }
      }
    }
  }
};
</script>

<style lang="scss">
// Cards
.cards {
  margin: 2em auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5em;
  padding: 0;

  .cardItem {
    list-style: none;
  }

  .card {
    height: 90px;
    width: 90px;
    font-size: 4em;
    background: #061018 url(/img/fabric.5959b418.png);
    background-blend-mode: soft-light;
    border: 1px solid #acacac;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
  }

  .show {
    font-size: 33px;
    background: #0b5891 url(/img/fabric.5959b418.png);
    cursor: default;
  }

  .match {
    cursor: default;
    background: #0e4b5a url(/img/fabric.5959b418.png);
    font-size: 33px;
    animation-name: match-animation;
    -webkit-animation-name: match-animation;
    animation-duration: 1000ms;
    -webkit-animation-duration: 1000ms;
    transform-origin: 70% 70%;
    animation-iteration-count: 1000ms;
    animation-timing-function: linear;
  }

  .close {
    cursor: default;
    animation-name: close;
    -webkit-animation-name: close;
    animation-duration: 1000ms;
    -webkit-animation-duration: 1000ms;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    &:hover,
    &:focus {
      background-blend-mode: hard-light;
      color: #112c3e;
      border: 2px solid #112c3e;
    }
  }
}

@keyframes match-animation {
  0%,
  100% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.9);
  }
}

@keyframes close {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
}

// Game Controller
.gameController .stars {
  padding: 0px;
  display: inline-block;
  margin: 2em auto 0;
}

.star {
  list-style: none;
  display: inline-block;
  margin: 0 0.2em;
  font-size: 1.5em;
}
.moves {
  font-weight: bold;
}

.gameController .restart {
  float: right;
  cursor: pointer;
}

// Overall
[role="status"] {
  height: 0;
  margin: 0;
  overflow: hidden;
  color: #960000;
  font-weight: bold;
}

#gameUpdate {
  height: 0;
  margin: 0;
  overflow: hidden;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

// Buttons

.buttonGray {
  background: #2e3d49;
  font-size: 1em;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
  &:hover,
  &:focus {
    background: #0b5891;
  }
}

.reset {
  padding-left: 1em;
}

// MEDIA QUERIES
@media (min-width: 350px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
    .card {
      height: 100px;
      width: 100px;
    }
  }
}
@media (min-width: 450px) {
  .cards {
    grid-gap: 1em;
    .card {
      height: 125px;
      width: 125px;
    }
  }
}
@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
