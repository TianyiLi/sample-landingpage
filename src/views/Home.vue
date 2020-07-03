<template>
  <div class="home"
    :class="pending ? 'pending' : ''">
    <form v-if="!user.token">
      <h3>{{ isSignup ? 'Sign up an account' : 'Login' }}</h3>
      <div>
        <label for="username">User name</label>
        <input id="username"
          type="text"
          v-model="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password"
          type="password"
          v-model="password" />
      </div>
      <div>
        <button @click.prevent="onSubmit" v-if="!isSignup">Signin</button>
        <button @click.prevent="onSubmit" v-else>Signup</button>
      </div>
      <div v-if="!isSignup">
        <a @click.prevent="isSignup = true"
          style="color: red">to signup</a>
      </div>
    </form>
    <div v-else>
      <router-link style="cursor: pointer"
        to="/about">go to get report</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { UserServices } from '../services/user'
export default Vue.extend({
  name: 'Home',
  data() {
    return {
      username: '',
      password: '',
      isSignup: false,
      pending: true,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['signin']),
    async onSubmit() {
      const { username, password } = this
      this.pending = true
      try {
        if (this.isSignup) {
          await UserServices.signup(username, password)
          alert('Please signin again')
          this.isSignup = false
        } else {
          await this.signin({ username, password })
          this.$router.push('/about')
        }
      } catch (error) {
        alert(error.message)
      }
      this.pending = false
    },
  },
})
</script>
<style scoped>
.pending {
  opacity: 0.5;
}
form > * {
  margin-top: 15px;
}
</style>
