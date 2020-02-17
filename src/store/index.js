import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routeAnnouncement: '',
    gameAnnounce: '',
    win: false,
    stars: 3,
    cardsFlipped: [],
    numCardsFlipped: 0,
    numMoves: 0,
    cardsMatched: [],
    types: [
      "car",
      "bug",
      "paw",
      "bomb",
      "gamepad",
      "diamond",
      "heart",
      "bell"
    ]
  },
  getters: {
    gameUpdate: (state) => {
      let update = 'You have ' + state.numMoves + ' total moves with ' + state.stars + ' stars left.'
      return update
    },
    deck: (state) => {
      let deck = {
        cards: []
      };
      for (let index = 0; index < state.types.length; index++) {
        deck.cards.push({
          name: state.types[index],
          icon: "fa fa-" + state.types[index],
          flipped: false,
          match: false,
          close: false
        });
        deck.cards.push({
          name: state.types[index],
          icon: "fa fa-" + state.types[index],
          flipped: false,
          match: false,
          close: false
        });
      }
      return deck;
    },
    winningMessage: (state) => {
      let msg;
      if (state.stars != 1) {
        msg = `You won the game with ${state.stars} stars left!`;
      } else {
        msg = `You won the game with ${state.stars} star left!`;
      }
      return msg;
    }
  },
  mutations: {
    ERROR(state, error) {
      state.announce = error
    },
    UPDATE_ANNOUNCE(state, payload) {
      state.announce = payload
    },
    UPDATE_ROUTE_ANNOUNCEMENT(state, payload) {
      state.routeAnnouncement = payload
    },
    UPDATE_WIN(state, payload) {
      state.win = payload
    },
    UPDATE_STARS(state, payload) {
      state.stars = payload
    },
    CLEAR_CARDSFLIPPED(state, payload) {
      state.cardsFlipped = payload;
    },
    UPDATE_CARDSFLIPPED(state, payload) {
      state.cardsFlipped.push(payload);
    },
    UPDATE_NUMCARDSFLIPPED(state, payload) {
      state.numCardsFlipped = payload;
    },
    UPDATE_NUMMOVES(state, payload) {
      state.numMoves = payload
    },
    CLEAR_CARDSMATCHED(state, payload) {
      state.cardsMatched = payload;
    },
    UPDATE_CARDSMATCHED(state, payload) {
      state.cardsMatched.push(payload);
    },
    UPDATE_GAMEANNOUNCE(state, payload) {
      state.gameAnnounce = payload
    }
  },
  actions: {
    async clearGame({ commit, dispatch }) {
      try {
        await dispatch('update_Win', ({ win: false }))
        await dispatch('update_Stars', ({ num: 3 }))
        await dispatch('clear_CardsFlipped', ({ cards: [] }))
        await dispatch('update_NumCardsFlipped', ({ num: 0 }))
        await dispatch('update_NumMoves', ({ moves: 0 }))
        await dispatch('clear_CardsMatched', ({ cards: [] }))
        await dispatch('update_GameAnnounce', ({ message: "" }))
      } catch (error) {
        commit('ERROR', error)
      }
    },
    update_routeAnnouncement({ commit }, { message }) {
      commit('UPDATE_ROUTE_ANNOUNCEMENT', message)
    },
    update_Win({ commit }, { win }) {
      commit('UPDATE_WIN', win)
    },
    update_Stars({ commit }, { num }) {
      commit('UPDATE_STARS', num);
    },
    clear_CardsFlipped({ commit }, { cards }) {
      commit('CLEAR_CARDSFLIPPED', cards)
    },
    update_CardsFlipped({ commit }, { cards }) {
      commit('UPDATE_CARDSFLIPPED', cards)
    },
    update_NumCardsFlipped({ commit }, { num }) {
      commit('UPDATE_NUMCARDSFLIPPED', num)
    },
    update_NumMoves({ commit }, { moves }) {
      commit('UPDATE_NUMMOVES', moves)
    },
    clear_CardsMatched({ commit }, { cards }) {
      commit('CLEAR_CARDSMATCHED', cards)
    },
    update_CardsMatched({ commit }, { cards }) {
      commit('UPDATE_CARDSMATCHED', cards)
    },
    update_GameAnnounce({ commit }, { message }) {
      commit('UPDATE_GAMEANNOUNCE', message)
    }
  }
})