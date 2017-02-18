<template>
  <div>
    <h1>List</h1>
    <mu-raised-button label="Sort" @click.native="sort" />
    <mu-raised-button label="Remove all" class="demo-raised-button" secondary @click="clearCompetitors" />

    <mu-table :showCheckbox="false">
      <mu-thead>
        <mu-tr>
          <mu-th>Start</mu-th>
          <mu-th>Name</mu-th>
          <mu-th>Email</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="competitor in competitors">
          <mu-td>{{getCompetitionStartTime(competitor.startTime)}}</mu-td>
          <mu-td>{{competitor.name}}</mu-td>
          <mu-td>{{competitor.email}}</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>

  </div>

</template>

<script>
  import vuex from 'vuex'
  import { competitorsRef, competitionRef } from '../store/firebase'

  export default {
    name: 'competition-list',
    data() { return {} },
    computed: {
      ...vuex.mapGetters(['competitors', 'competition'])
    },
    firebase: {
      competitors: competitorsRef,
      competition: { source: competitionRef, asObject: true }
    },
    methods: {
      getCompetitionStartTime(startTimeId) {
        return this.competition[startTimeId]
      },
      clearCompetitors() {
        competitorsRef.remove()
          .then(() => {
            console.log('competitors removed')
          })
      },
      sort() {
        if (this.competitors === null) {
          console.log('serious issue, no competitors loaded')
        }
        this.competitors = this.competitors.sort((a, b) => {
          let result
          if (a.startTime < b.startTime) {
            result = -1
          } else
            if (a.startTime > b.startTime) {
              result = 1
            } else {
              result = 0
            }
          return result
        })
      }
    }

  }

</script>