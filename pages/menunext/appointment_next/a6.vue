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
        if(columnData === "start_date" || columnData === "last_date" || columnData === "birthday"){
            queryData = queryData.eq(columnData, inputData);
        } else if(columnData == "number"){
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
    <TableData v-model="dataset"/>
</template>