<template>
  <div>
    <div>
      <h2>Form</h2>
      <mu-paper>
        <mu-content-block>
          <form>
            <mu-text-field v-model.lazy="name" label="Namn" hintText="ex. Tim S." type="text" :errorText="invalidNameErrorText" /><br/>
            <input type="text" name="name" style="display: none;">

            <mu-text-field v-model.lazy="email" hintText="ex. name@domain.se" label="Email" type="email" name="email" :errorText="invalidEmailErrorText"
            /><br/>
            <input type="email" name="email" style="display: none;">

            <mu-radio v-if="competition.startTime1" :label="startTimeLabel('startTime1')" name="startGroup" nativeValue="startTime1"
              v-model="startTime" /> <br/>
            <mu-radio v-if="competition.startTime2" :label="startTimeLabel('startTime2')" name="startGroup" nativeValue="startTime2"
              v-model="startTime" /> <br/>
            <mu-radio v-if="competition.startTime3" :label="startTimeLabel('startTime3')" name="startGroup" nativeValue="startTime3"
              v-model="startTime" /> <br/>
            <div>{{feedback}}</div>

            <mu-raised-button label="Add" class="demo-raised-button" primary @click="add" />

          </form>
        </mu-content-block>
      </mu-paper>
    </div>
  </div>
</template>

<script>
  import vuex from 'vuex'
  import { competitorsRef, competitionRef } from '../store/firebase'

  function validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  export default {
    name: 'competition-entry-form',
    data() {
      return {
        name: 'Test Person',
        email: 'testperson@gmail.com',
        pistolNumber: '',
        startTime: null,
        snackbar: false,
        toast: false,
        feedback: '',
        cleanFormAfterAdd: false,
        navigateToListAfterEntry: false
      }
    },
    computed: {
      // eslint-disable
      ...vuex.mapGetters(['competitors', 'competition']),
      // eslint-enable
      invalidNameErrorText() {
        let errorText = this.name.length && !this.isValidName() ? errorText = 'Ange förnamn och minst första bokstaven i efternamnet' : ''
        return errorText
      },
      invalidEmailErrorText() {
        let errorText = ''
        const hasInput = Boolean(this.email.length)
        if (hasInput && !this.isValidEmail(this.email)) {
          errorText = 'Ange epost giltlig adress'
        }
        return errorText
      },
      startingCompetitors1() {
        return this.estartingCompetitors
      }
    },
    firebase: {
      competitors: competitorsRef,
      competition: { source: competitionRef, asObject: true }
    },
    methods: {
      isValidName() {
        var matches = this.name.match(/\b[^\d\s]+\b/g)
        const isValid = matches && matches.length >= 2
        this.feedback = isValid ? '' : 'minst en bokstav i efternamnet'
        return isValid
      },
      isValidEmail() {
        const isValid = validateEmail(this.email)
        this.feedback = isValid ? '' : 'ange en epostadress'
        return isValid
      },
      isValidStartTime() {
        const isValid = Boolean(this.startTime)
        this.feedback = isValid ? '' : 'välj en starttid'
        return isValid
      },
      exists(entry) {
        const foundEntry = this.competitors.find((competitor) => { return competitor.name === entry.name })
        if (foundEntry) {
          this.feedback = `${entry.name} är redan anmäld`
        }
        return foundEntry
      },
      add() {
        if (this.isValidName() && this.isValidEmail() && this.isValidStartTime()) {
          const data = {
            startTime: this.$data.startTime,
            name: this.$data.name,
            email: this.$data.email
          }
          console.log('adding competitor')
          competitorsRef.push(data)
          this.feedback = this.name + ' är nu anmäl!'
          if (this.cleanFormAfterAdd) {
            this.startTime = ''
            this.name = ''
            this.email = ''
          }
          if (this.navigateToListAfterEntry) {
            this.$router.push('/list')
          }
        } else {
          console.log('non valid form inputs')
          this.feedback = 'värdena i formuläret är inte godkänt'
          this.showSnackbar()
        }
      },
      competitorsStartCount(startTime) {
        const startingCompetitors = this.competitors.filter((competitor) => { return competitor.startTime === startTime })
        return startingCompetitors.length
      },
      startTimeLabel(startTime) {
        return `${this.competition[startTime]} (${this.competitorsStartCount(startTime)})`
      },
      enteredCompetitors(startTime) {
        return this.competitors.filter((competitor) => { return competitor.startTime === startTime }).length
      }
    }
  }

</script>

<style lang="css"></style>