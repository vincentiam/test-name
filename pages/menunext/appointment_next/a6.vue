<script setup>
import { useRoute } from 'vue-router';
const supabase = useSupabaseClient()
const route = useRoute();
const inputData = route.query.filter;
const columnData = route.query.column;

const dataset = ref([])
const fetchRecords = async () => {
    let queryData = supabase.from('users').select('*')
    if (inputData.trim() !== '') {
        if (columnData === "startDate" || columnData === "lastDate") {
            queryData = queryData.eq(columnData, inputData); // Exact match for date columns
        } else if(columnData === "userBirthday"){
            queryData = queryData.eq(`${columnData}`, inputData); // Exact match for date columns
        } else {
            queryData = queryData.ilike(columnData, `%${inputData}%`); // Case-insensitive match for other columns in patient_appointment
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
    <TableData v-model="dataset"/>
</template>