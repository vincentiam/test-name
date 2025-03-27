<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted, ref } from 'vue';
    const route = useRoute();
    const inputData = route.query.filter || '';
    const columnData = route.query.column || '';
    const supabase = useSupabaseClient();

    const dataset = ref([]);

    const fetchData = async () => {
    let query = supabase
        .from('drSchedule')
        .select(`drSchedule_date, drSchedule_time, drSchedule_clinic, dr(dr_id, dr_name)`);

    if (columnData === 'dr' && inputData.trim() !== '') {
        // 先找符合 dr_name 的 dr_id
        const { data: drList, error: drError } = await supabase
            .from('dr')
            .select('dr_id, dr_name')
            .ilike('dr_name', `%${inputData}%`);

        if (drError) {
            console.error('查詢 dr 錯誤：', drError);
            return;
        }

        const drIds = drList.map(d => d.dr_id);

        if (drIds.length > 0) {
            query = query.in('dr_id', drIds);
        } else {
            dataset.value = []; // 沒有匹配的醫師時直接回傳空資料
            return;
        }
    }

    if (columnData === 'date') {
        try {
            const cleaned = inputData.replace(/\(.*?\)/g, '').trim();
            const dateObj = new Date(cleaned);

            if (!isNaN(dateObj.getTime())) {
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                query = query.eq('drSchedule_date', formattedDate);
            } else {
                console.warn('⚠️ 日期格式錯誤，原樣使用：', inputData);
                query = query.eq('drSchedule_date', inputData);
            }
        } catch (e) {
            console.error('日期處理錯誤：', e);
        }
    }

    const { data: fetchedData, error: fetchError } = await query;

    if (fetchError) {
        console.error('Supabase 查詢錯誤：', fetchError);
    } else {
        dataset.value = fetchedData;
        console.table(fetchedData);
    }
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <DataTable :value="dataset">
        <Column field="dr.dr_id" header="醫師編號" />
        <Column field="dr.dr_name" header="醫師姓名" />
        <Column field="drSchedule_clinic" header="科別" />
        <Column field="drSchedule_date" header="日期" />
        <Column field="drSchedule_time" header="時段" />
    </DataTable>
</template>
