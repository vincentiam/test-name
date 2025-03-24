<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const inputData = route.query.filter;
const columnData = route.query.column;

const supabase = useSupabaseClient();

const { data, error } = await useAsyncData('drSchedule', async () => {
    let queryData = supabase.from('drSchedule').select(`drSchedule_date,drSchedule_time,drSchedule_clinic, dr(dr_id, dr_name)`);
console.log(queryData)
    if (columnData === 'dr') {
        if (inputData.trim() !== '') {
            queryData = queryData.filter('dr_name', 'ilike', `%${inputData}%`)
        }
    } else if (columnData === 'date') {
        let formattedDate = '';
        try {
            const cleaned = inputData.replace(/\(.*?\)/g, '').trim();
            const dateObj = new Date(cleaned);

            if (!isNaN(dateObj.getTime())) {
                const year = dateObj.getFullYear(); // ✅ 改用本地時間
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                formattedDate = `${year}-${month}-${day}`;
            } else {
                console.warn('⚠️ 無法轉換為日期，使用原始輸入：', inputData);
                formattedDate = inputData;
            }

            queryData = queryData.eq('drSchedule_date', formattedDate);
        } catch (e) {
            console.error('日期處理錯誤：', e);
        }
    }

    // ⚠️ 不要重複命名 data / error
    const { data: fetchedData, error: fetchError } = await queryData;

    if (fetchError) {
        console.error('Supabase 查詢錯誤：', fetchError);
    } else {
        console.log('✅ 查詢結果：', fetchedData);
    }

    return fetchedData;
});

if (error.value) {
    console.error('useAsyncData 錯誤：', error.value);
}
</script>

<template>
    <DataTable :value="data">
        <Column field="dr.dr_id" header="醫師編號" />
        <Column field="dr.dr_name" header="醫師姓名" />
        <Column field="drSchedule_clinic" header="科別" />
        <Column field="drSchedule_date" header="日期" />
        <Column field="drSchedule_time" header="時段" />
    </DataTable>
</template>
