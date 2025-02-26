<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const stateData = route.state?.filter;
console.log(stateData.value)
</script>
<template>
   {{stateData}} 
</template>