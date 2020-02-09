<template>
  <div id="app">
    <header>
      <h1 class="title">Matching Game</h1>
    </header>
    <p role="status">{{routeAnnouncement}}</p>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Instructions">Instructions</router-link>
    </div>
    <router-view/>
  </div>
</template>

  <script>
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapState(["routeAnnouncement"])
  },
  watch: {
    $route: function() {
      this.announceRoute({message:(this.$route.name + " page loaded")})
    }
  },
  methods: {
    ...mapActions(["update_routeAnnouncement"]),
    announceRoute(message){
      this.update_routeAnnouncement(message);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.title{
  margin: 2em auto .5em;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    // text-decoration: none;

    &.router-link-exact-active {
      text-decoration: none;
      color: #0b5891;
      border-bottom: 2px solid #0b5891;
    }
  }
}

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: #ffffff url("assets/fabric.png");
}
</style>
