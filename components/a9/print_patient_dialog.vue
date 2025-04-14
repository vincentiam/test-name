<script setup>
    import { useToast } from 'primevue/usetoast';
    const supabase = useSupabaseClient()
    const toast = useToast();
    const visible = defineModel('visible')
    const printDataTable = defineModel('printDataTable')
    const printTableDialog = defineModel('printTableDialog')
    const condition = ref('recent')
    const includeArea = ref(false)
    const fields = ref([])
    const rangeDates = ref(null)
    const startNumber = ref(null)
    const endNumber = ref(null)

    const conditionOptions = [
        { label: '最近複診日期區間', value: 'recent' },
        { label: '病患編號區間資料', value: 'idRange' },
        { label: '初診日期區間資料', value: 'firstVisit' },
        { label: '全部病患基本資料', value: 'all' },
    ]

    const formatDate = (d) => {
        console.log(d)
        const date_temp = new Date(d);
        const year = date_temp.getFullYear();
        const month = String(date_temp.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
        const day = String(date_temp.getDate()).padStart(2, '0');

        const formatted = `${year}-${month}-${day}`;
        console.log(formatted); // 輸出：2025-03-10
        return formatted
    }

    const printDialogConfirm = async() => {
        if (condition.value === 'all'){
            const { data, error } = await supabase.from('users').select('*')
            if(error) {
                toast.add({
                    severity: 'error',
                    summary: '抓取錯誤',
                    detail: `${error.message}`,
                    life: 1500
                });
                console.log(error.message)
            } else if(data.length===0){
                toast.add({
                    severity: 'info',
                    summary: '無資料',
                    life: 3000
                });
            } else {
                printDataTable.value = data
                printTableDialog.value = true
                rangeDates.value=null
            }
            console.log(data)
        } else if (condition.value === 'recent'){
            let startDateTemp = formatDate(rangeDates.value[0])
            let endtDateTemp = formatDate(rangeDates.value[1])
            const { data, error } = await supabase.from('users').select('*').gte('users_last_date', startDateTemp).lte('users_last_date', endtDateTemp)
            if(error) {
                toast.add({
                    severity: 'error',
                    summary: '抓取錯誤',
                    detail: `${error.message}`,
                    life: 1500
                });
                console.log(error.message)
            } else if(data.length===0){
                toast.add({
                    severity: 'info',
                    summary: '無資料',
                    life: 3000
                });
            } else {
                printDataTable.value = data
                printTableDialog.value = true
                rangeDates.value=null
            }
            console.log(data)
            
        } else if (condition.value === 'idRange'){
            const { data, error } = await supabase.from('users').select('*').gte('users_medical_history_number', startNumber.value)
            .lte('users_medical_history_number', endNumber.value)
            if(error) {
                toast.add({
                    severity: 'error',
                    summary: '抓取錯誤',
                    detail: `${error.message}`,
                    life: 1500
                });
                console.log(error.message)
            } else if(data.length===0){
                toast.add({
                    severity: 'info',
                    summary: '無資料',
                    life: 3000
                });
            } else {
                printDataTable.value = data
                printTableDialog.value = true
                rangeDates.value=null
            }
            console.log(data)
        } else {
            let startDateTemp = formatDate(rangeDates.value[0])
            let endtDateTemp = formatDate(rangeDates.value[1])
            const { data, error } = await supabase.from('users').select('*').gte('users_start_date', startDateTemp).lte('users_start_date', endtDateTemp)
            if(error) {
                toast.add({
                    severity: 'error',
                    summary: '抓取錯誤',
                    detail: `${error.message}`,
                    life: 1500
                });
                console.log(error.message)
            } else if(data.length===0){
                toast.add({
                    severity: 'info',
                    summary: '無資料',
                    life: 3000
                });
            } else {
                printDataTable.value = data
                printTableDialog.value = true
                rangeDates.value=null
            }
            console.log(data)
        }
    }
</script>

<template>
    <Dialog v-model:visible="visible">
        <div class="space-y-4">

            <!-- 條件輸入 -->
            <div class="grid grid-cols-2 gap-2">
            <div v-for="(label, i) in conditionOptions" :key="i" class="flex items-center gap-2">
                <RadioButton v-model="condition" :inputId="'cond' + i" :value="label.value" />
                <label :for="'cond' + i" class="text-sm">{{ label.label }}</label>
            </div>
            </div>

            <div class="w-full">
                <div v-if="condition==='firstVisit' || condition==='recent'" class="w-full">
                    <p class="text-sm text-slate-500">MM/DD/YYYY~MM/DD/YYYY</p>
                    <DatePicker v-model="rangeDates" selectionMode="range" :manualInput="false" class="w-full"/>
                </div>
                <div v-if="condition==='idRange' " class="flex flex-rol w-full">
                    <InputText v-model="startNumber" class="w-full items-center"/>
                    <p class="text-lg items-center">~</p>
                    <InputText v-model="endNumber" class="w-full items-center"/>
                </div>
            </div>

            <!-- 欄位排序 -->
            <div class="border-t pt-4 space-y-2">
                

                <div class="flex items-center gap-4 text-sm">
                    <RadioButton v-model="includeArea" inputId="noArea" :value="false" />
                    <label for="noArea">不含區號及地址列印</label>
                    <RadioButton v-model="includeArea" inputId="yesArea" :value="true" />
                    <label for="yesArea">含區號及地址列印</label>
                </div>
            </div>

                <!-- 按鈕 -->
            <div class="flex justify-end gap-2 pt-2">
                <Button label="確定" icon="pi pi-check" @click="printDialogConfirm" />
                <Button label="離開" icon="pi pi-times" class="p-button-secondary" @click="visible=false" />
            </div>
        </div>
    </Dialog>
</template>