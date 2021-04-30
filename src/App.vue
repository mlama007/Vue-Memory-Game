<template>
  <div id="app">
    <header>
      <ul class="skip-links">
        <li>
          <a href="#main" ref="skipLink">Skip to main content</a>
        </li>
        <li>
          <a href="#extra-links" ref="skipLink">Skip to extra links</a>
        </li>
        <li>
          <a href="#extra-links-2" ref="skipLink">Skip to extra links 2</a>
        </li>
        <li>
          <a href="#extra-not-links" ref="skipLink">Skip to extra not links </a>
        </li>
      </ul>
      <h1 class="title">Matching Game</h1>
    </header>
    <p role="status">{{routeAnnouncement}}</p>
    <div id="nav" ref="nav">
      <router-link to="/" aria-current="page" :active-class="$route.path=='/' ? 'router-link-active' : ''">Home</router-link> |
      <router-link to="/Instructions">Instructions</router-link> |
      <router-link to="/Trap-focus">Trap Focus</router-link> |
      <router-link to="/Trap-focus2">Trap Focus 2</router-link>
    </div>
    <router-view />
    
    <!--   
    <div>{{Date.now()}}</div>    
    -->
  </div>  
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState(["routeAnnouncement"])
  },
  watch: {
    $route: function() {
      this.$refs["skipLink"].focus();

      this.announceRoute({ message: this.$route.name + " page loaded" });
      
      this.$nextTick(function() {

        let navLinks = this.$refs.nav
        
        navLinks.querySelectorAll("[aria-current]")
          .forEach(current => {
            current.removeAttribute("aria-current");
          });

        navLinks.querySelectorAll(".router-link-exact-active")
          .forEach(current => {
            current.setAttribute("aria-current", "page");
          });
      });

    }
  },
  methods: {
    ...mapActions(["update_routeAnnouncement"]),
    announceRoute(message) {
      this.update_routeAnnouncement(message);
    }
  }
};
</script>

<style lang="scss">
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

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// HACKERY!
// this is a little gross, but its to force override all other 
// focus values for things in the app.  I want these to be obnoxiously easy to see...
:focus, // generic...
a:focus, // links
input:focus, // input type="text"
button:focus, 
button.card:focus {  // the big buttons are thiss
  -webkit-box-shadow: 0px 0px 15px 10px rgba(255,0,255,0.32);
  -moz-box-shadow: 0px 0px 15px 10px rgba(255,0,255,0.32);
  box-shadow: 0px 0px 15px 10px rgba(255,0,255,0.32) !important;
}

// Skip to Main
.skip-links {
  margin: 0;
  list-style: none;
  padding: 0;
  position: absolute;
  white-space: nowrap;

  a {
    background: #0e4b5a url(/img/fabric.5959b418.png);
    border: 1px solid black;
    display: block;
    opacity: 0;
    font-size: 1em;
    font-weight: bold;

    &:focus {
      opacity: 1;
      padding: 1em;
    }
  }
}

// Header
.title {
  margin: 2em auto 0.5em;
}

// Nav
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-active {
      text-decoration: none;
      color: #0b5891;
      border-bottom: 2px solid #0b5891;
    }
  }
}

// absurd colors to remind myself that these are different clickable elements
li.star:nth-child(1) {
  color: blue;
}
li.star:nth-child(2) {
  color: green;
}
li.star:nth-child(3) {
  color: red;
}
</style>
