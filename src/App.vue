<template>
  <div id="app">
    <div class="header">
      <div class="logo" v-if="false">
        <img class="abb-logo" src="./assets/abb-logo-33px.svg" alt="ABB logo">
      </div>
      <div class="app-name">Monorail Task Viewer</div>
    </div>
    <div class="nav-bar">
      <div id="nav">
          <router-link style="margin-left: 16px" to="/">Overview</router-link>
        |
          <router-link to="/insert">Add New</router-link>
      </div>
    </div>
    <div id="body">
      <router-view/>
    </div>
  </div>
</template>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .header {
    width: 80%;
    height: 64px;
    /*background-color: #F0F0F0;*/
    background-color: White;
    margin: auto;
    display: flex;
    align-items:center;
  }

  .logo {
    width: 88px;
    height: 40px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }

  .abb-logo {
    width: 88px;
    height: 33px;
    margin-top: 5px;
    margin-left: 10px;
  }

  .app-name {
    font-size: 36px;
    font-weight: bold;
    color: #6E6E6E;
    margin-left: 24px;
  }

  .nav-bar {
    height: 32px;
    width: 80%;
    background-color: #6E6E6E;
    border-radius: 1em;
    margin: auto;
    color: white;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-start;
    align-items:center;
  }

  #nav a {
    font-weight: bold;
    color: white;
  }

  #nav a.router-link-exact-active {
    color: #FF000F;
    /*background-color: #ffffff;*/
  }

  #body {
    width: 80%;
    /*background-color: #F0F0F0;*/
    background-color: White;
    margin: auto;
    padding-bottom: 160px;
  }
</style>
