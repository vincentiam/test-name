<script setup>
import { useRoute } from 'vue-router';
const supabase = useSupabaseClient()
const route = useRoute();
const inputData = route.query.filter;
const columnData = route.query.column;

const dataset = ref([])
const fetchRecords = async () => {
   let queryData = supabase.from('patient_appointment').select('*')
   if (inputData.trim() !== ''){
      if(columnData === "startDate" || columnData === "lastDate" || columnData === "birthday"){
         queryData = queryData.eq(columnData, inputData);
      }else{
         queryData.ilike(columnData,`%${inputData}%`)
      }
   }
   const { data, error } = await queryData
   if(error) {
      console.error('error', error)
   } else {
      dataset.value = data
   }
}

onMounted(() => {
   fetchRecords()
})
</script>
<template>
   <DataTable :value="dataset" tableStyle="min-width: 50rem">
      <Column field="name" header="Name"></Column>
      <Column field="ID" header="ID"></Column>
      <Column field="birthday" header="Birthday"></Column>
      <Column field="phone" header="Phone"></Column>
      <Column field="address" header="Address"></Column>
      <Column field="remark" header="Remark"></Column>
      <Column field="startDate" header="Start Date"></Column>
      <Column field="lastDate" header="Last Date"></Column>
   </DataTable>
</template>