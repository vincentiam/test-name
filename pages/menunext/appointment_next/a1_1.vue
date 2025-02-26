<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const stateData = route.query;
console.log(stateData)
</script>
<template>
   {{stateData?.filter}}
</template>