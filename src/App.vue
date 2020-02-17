<template>
  <div id="app">
    <header>
      <h1 class="title">Matching Game</h1>
    </header>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/Instructions">Instructions</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
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

// Skip to Main
.skip-links {
  margin: 0;
  list-style: none;
  padding: 0;
  position: absolute;
  white-space: nowrap;

  a {
    background: #0e4b5a url(/img/fabric.5959b418.png);
    background-blend-mode: color-burn;
    display: block;
    opacity: 0;
    font-size: 1em;
    font-weight: bold;

    &:focus {
      opacity: 1;
      padding: 1em;
    }

    &:visited {
      color: white;
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
    // text-decoration: none;

    &.router-link-exact-active {
      text-decoration: none;
      color: #0b5891;
      border-bottom: 2px solid #0b5891;
    }
  }
}
</style>
