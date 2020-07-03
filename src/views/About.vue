<template>
  <div class="about">
    <h1>This is an about page</h1>
    <section>
      <h3>Here is your personal info</h3>
      <table>
        <thead>
          <th>key</th>
          <th>attr</th>
        </thead>
        <tbody>
          <tr v-for="infoKey in userTableHeaders()" :key="infoKey">
            <td>{{ infoKey }}</td>
            <td>{{ user.info[infoKey] }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section>
      <h3>report of all user activity</h3>
      <table>
        <thead>
          <th>activity name</th>
          <th>user name</th>
          <th>first occurrence name</th>
          <th>last occurence</th>
          <th>amount</th>
        </thead>
        <tbody>
          <tr v-for="row of listOfUser" :key="row.id">
            <td>{{ row.activity_name }}</td>
            <td>{{ row.user_name }}</td>
            <td>{{ row.first_occurence_name }}</td>
            <td>{{ row.last_occurrence }}</td>
            <td>{{ row.amount }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { ActivityService } from '../services/activity'
export default Vue.extend({
  name: 'about',
  data() {
    return {
      listOfUser: [] as any[],
    }
  },
  computed: {
    ...mapState(['user', 'activity']),
  },
  async mounted() {
    try {
      const reuslt = await ActivityService.getReport()
      this.listOfUser = reuslt
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    activityTableHeaders() {
      return Object.keys(this.activity.listOfActivity)
    },
    userTableHeaders() {
      return Object.keys(this.user.info)
    },
  }
})
</script>
