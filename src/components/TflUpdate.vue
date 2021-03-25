

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
          v-bind:hide-or-show-bad-service = hideOrShowBadService
        />
          <!-- v-bind:show-all-service = showAllService -->
      </div>
    </header>

    <div 
      class="wrapper flex_column" 
      v-if="!badServiceHidden"
    >
      <div 
        class="card"
        v-bind:key="trainline.linename"
        v-for="trainline in trainlines"
      >
        <Emoji v-bind:trainline = trainline />
        <UpdateInfo v-bind:trainline = trainline />
      </div>
    </div>
    
    <!-- filtered view -->
    <div 
      class="wrapper flex_column" 
      v-else
    >
      <div 
        class="card"
        v-bind:key="trainline.linename"
        v-for="trainline in filteredTrainlines"
      >
        <Emoji v-bind:trainline = trainline />
        <UpdateInfo v-bind:trainline = trainline />
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import GoodHideShowButton from './GoodHideShowButton'
import Emoji from './Emoji'
import UpdateInfo from './UpdateInfo'

// let storeData 

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
    GoodHideShowButton,
    Emoji,
    UpdateInfo
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
      this.$store.dispatch('sortTrainLines', this.trainlines)
    },
    hideOrShowBadService: function(){
      // storeData = this.trainlines // note, this stores old info
      // this.trainlines = this.trainlines.filter((trainline)=>trainline.lineStatuses[0].statusSeverityDescription === 'Good Service')
      this.badServiceHidden = !this.badServiceHidden
    },
    // showAllService: function(){
    //   this.trainlines = storeData
    //   this.badServiceHidden = false
    // }
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
    overallStatus: function(){
      let goodServices = 0
      this.trainlines.forEach(trainline=>{
        if (trainline.lineStatuses[0].statusSeverityDescription === 'Good Service') goodServices++
      })
      return goodServices > 1 ?
        `${goodServices} lines have Good Service`
        :
        `${goodServices} line have Good Service`
    },
    filteredTrainlines: function() {
      return this.trainlines.filter((trainline)=>trainline.lineStatuses[0].statusSeverityDescription === 'Good Service')
    }    
}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
