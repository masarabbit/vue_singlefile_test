

<template>
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
</template>      


<script>
  export default {
    props: {
      trainline: Object
    }
}
</script>

