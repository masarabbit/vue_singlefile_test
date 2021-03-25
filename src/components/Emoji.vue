

<template>
  <p class="title" v-bind:class="trainline.id">
    {{ trainline.name }}

    <img 
    class="emoji"
    v-if="trainline.lineStatuses[0].statusSeverityDescription === 'Good Service'" 
    src= '../assets/happy.svg'
    />
    <img 
    class="emoji"
    v-else-if="trainline.lineStatuses[0].statusSeverityDescription === 'Planned Closure'" 
    src= '../assets/bit_sad.svg'
    />
    <img 
    class="emoji"
    v-else
    src= '../assets/sad.svg'
    />
  </p>
</template>      


<script>
  export default {
    props: {
      trainline: Object
    }
}
</script>

