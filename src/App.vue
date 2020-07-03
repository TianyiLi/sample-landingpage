<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </header>
    <router-view />
    <footer class="footer">
      <a href="mailto:e0991100238@gmail.com&body='hello world'">
        contact me
      </a>
    </footer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { UserServices } from './services/user'
export default Vue.extend({
  name: 'root',
  async mounted() {
    console.log('mounte')
    const auth = JSON.parse(localStorage.getItem('auth') || 'false') as {
      token: string
    }
    if (auth) {
      try {
        await UserServices.refreshToken()
      } catch (error) {
        console.error(error)
      }
    }
    this.pending = false
  },
  data() {
    return { pending: false }
  },
})
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
