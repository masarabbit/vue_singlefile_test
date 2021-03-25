

<template>
  <div>
    {{ message }}

    <header>
      <h1>
        TFL Status <span>{{ displayUpdateTime }}</span> 
      </h1>
      <p>{{ overallStatus }}</p> 
      
      <div>
        <button v-on:click="sortTrainLines">
          Reverse Order
        </button>
        
        <GoodHideShowButton 
          v-bind:bad-service-hidden = badServiceHidden 
          v-bind:hide-bad-service = hideBadService
          v-bind:show-all-service = showAllService
        />
      </div>
  
    </header>

    <div class="wrapper flex_column">
      <div 
      class="card"
      v-bind:key="trainline.linename"
      v-for="trainline in trainlines"
      >
        <p class="title" v-bind:class="trainline.id">
          {{ trainline.name }}

          <img class="emoji"
          v-if="trainline.lineStatuses[0].statusSeverityDescription === 'Good Service'" 
          src= '../assets/happy.svg'
          />
          <img class="emoji"
          v-else-if="trainline.lineStatuses[0].statusSeverityDescription === 'Planned Closure'" 
          src= '../assets/bit_sad.svg'
          />
          <img v-else class="emoji"
          src= '../assets/sad.svg'
          />
        </p>

        <div class="info">
          <p 
          class="status"
          v-bind:class="trainline.lineStatuses[0].statusSeverityDescription.replace(' ','_').toLowerCase()"
        >
          {{ trainline.lineStatuses[0].statusSeverityDescription }}
        </p>
        <p
          class="reason"
          v-bind:class="trainline.lineStatuses[0].statusSeverityDescription"
        >
          {{ trainline.lineStatuses[0].reason ? 
              trainline.lineStatuses[0].reason.split(':').slice(1).join(':') 
              :
              null
          }}
        </p>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios'
import GoodHideShowButton  from './GoodHideShowButton'

let storeData 


export default {
  name: 'update',
  data () {
    return {
      message: 'Loading',
      trainlines: [],
      badServiceHidden: false
    }
  },
  components: {
    GoodHideShowButton 
  },
  mounted () {
    axios
      .get('https://api.tfl.gov.uk/line/mode/tube/status')
      .then(response => {
        this.trainlines = response.data
        this.message = null
      })
      .catch(error=>{console.log(error)})
  },
  methods: {
    sortTrainLines: function(){
      // this.trainlines = this.trainlines.reverse()
      this.$store.dispatch('sortTrainLines', this.trainlines)
    },
    hideBadService: function(){
      storeData = this.trainlines // note, this stores old info
      this.trainlines = this.trainlines.filter((trainline)=>trainline.lineStatuses[0].statusSeverityDescription === 'Good Service')
      this.badServiceHidden = true
    },
    showAllService: function(){
      this.trainlines = storeData
      this.badServiceHidden = false
    }
  },
  computed: {
      displayUpdateTime: function(){
        const now = new Date()
        const minutes = String(now.getMinutes()).length === 2 ?
          now.getMinutes()
          :
          '0' + now.getMinutes()      
        return `Last updated: ${now.getHours()}:${minutes} ${now.toDateString()}`
      },
        overallStatus: function() {
        let goodServices = 0
        this.trainlines.forEach(trainline=>{
          if (trainline.lineStatuses[0].statusSeverityDescription === 'Good Service') goodServices++
        })
        return goodServices > 1 ?
          `${goodServices} lines have Good Service`
          :
          `${goodServices} line have Good Service`
      }

}
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
