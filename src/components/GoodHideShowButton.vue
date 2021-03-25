

<template>
  <button 
  v-if="!badServiceHidden" 
  v-on:click="hideOrShowBadService">
    Hide Bad Service
  </button>

  <button 
  v-else
  v-on:click="hideOrShowBadService">
    Show All
  </button>
</template>      


<script>
  export default {
    props: {
      badServiceHidden: Boolean,
      hideOrShowBadService: Function
      // hideBadService: Function,
      // showAllService: Function,
    }
}
</script>

