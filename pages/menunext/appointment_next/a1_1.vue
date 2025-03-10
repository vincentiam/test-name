<script setup>
import { useRoute } from 'vue-router';
const supabase = useSupabaseClient()
const route = useRoute();
const inputData = route.query.filter;
const columnData = route.query.column;

const dataset = ref([])
const fetchRecords = async () => {
   let queryData = supabase.from('patient_appointment')
      .select('id, remark, start_date, last_date, users!inner(medical_history_number, name, phone, birthday, address)');

   if (inputData.trim() !== '') {
      if (columnData === "start_date" || columnData === "last_date") {
         queryData = queryData.eq(columnData, inputData); // Exact match for date columns
      } else if(columnData === "birthday"){
         queryData = queryData.eq(`users.${columnData}`, inputData); // Exact match for date columns
      }
      else if (columnData === "medical_history_number" || columnData === "name" || columnData === "phone" || columnData === "address") {
         queryData = queryData.ilike(`users.${columnData}`, `%${inputData}%`); // Case-insensitive match for users' columns
      } else {
         queryData = queryData.ilike(columnData, `%${inputData}%`); // Case-insensitive match for other columns in patient_appointment
      }
   }

   const { data, error } = await queryData;
   if (error) {
      console.error('error', error);
   } else {
      console.log(data);
      dataset.value = data
         .map(item => ({
            ...item,
            name: item.users?.name || '',
            phone: item.users?.phone || '',
            birthday: item.users?.birthday || '',
            medical_history_number: item.users?.medical_history_number || '',
            address: item.users?.address || ''
         }));
   }
};



onMounted(() => {
   fetchRecords()
})
</script>
<template>
   <TableData v-model="dataset"/>
</template>