

<template>
  <button 
  v-if="!badServiceHidden" 
  v-on:click="hideBadService">
    Hide Bad Service
  </button>

  <button 
  v-else
  v-on:click="showAllService">
    Show All
  </button>
</template>      


<script>
  export default {
    props: {
      badServiceHidden: Boolean,
      hideBadService: Function,
      showAllService: Function,
    }
}
</script>

