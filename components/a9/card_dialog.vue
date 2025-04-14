<script setup>
    const visible = defineModel('visible')
    const records = ref([
    {
        編號: '0000027952',
        姓名: '蘇妍婷',
        日期: '113/03/04',
        電話: '0990245556',
        金額: 100,
        延款否: 'N'
    }
    ])

    const detail = ref({
    處方日期: '113/03/04',
    碼段: '3',
    診別: '01',
    病歷號: '0000027952',
    姓名: '蘇妍婷',
    包藥天數: '0',
    診斷代碼: '01'
    })

    const treatments = ref([
    { 項目: '【肘】膏 - 右', 數量: 1 },
    { 項目: '【肘】封 - 右', 數量: 1 },
    { 項目: '【肘】針', 數量: 1 },
    { 項目: '針破', 數量: 1 },
    { 項目: '神頂', 數量: 1 },
    { 項目: '傷真', 數量: 1 }
    ])

    const currentIndex = ref(0)

    const goFirst = () => currentIndex.value = 0
    const goLast = () => currentIndex.value = records.value.length - 1
    const goNext = () => {
        if (currentIndex.value < records.value.length - 1) currentIndex.value++
    }
    const goPrev = () => {
        if (currentIndex.value > 0) currentIndex.value--
    }

    const editRecord = () => {
        console.log('Edit record:', records.value[currentIndex.value])
    }
    const deleteRecord = () => {
        if (records.value.length > 0) {
            records.value.splice(currentIndex.value, 1)
            currentIndex.value = Math.max(0, currentIndex.value - 1)
        }
    }
    const selectPrescription = () => {
        alert('選擇處方功能尚未實作')
    }
    const saveRecord = () => {
        alert('紀錄已儲存')
    }
    const addRecord = () => {
        records.value.push({
            編號: '',
            姓名: '',
            日期: '',
            電話: '',
            金額: 0,
            延款否: ''
        })
        currentIndex.value = records.value.length - 1
    }
    const searchRecord = () => {
        alert('查詢功能尚未實作')
    }
    const printRecord = () => {
        window.print()
    }
</script>

<template>
    <Dialog v-model:visible="visible" modal header="欠款登記簿">
        <div class="flex flex-col space-y-2">
            <!-- 表格區 -->
            <DataTable :value="records" class="text-sm" scrollable scrollHeight="150px">
                <Column field="編號" header="病患編號" />
                <Column field="姓名" header="病患姓名" />
                <Column field="日期" header="缺數日期" />
                <Column field="電話" header="電話" />
                <Column field="金額" header="缺數金額" />
                <Column field="延款否" header="延款否(延款碼段)" />
            </DataTable>
    
            <!-- 詳細資訊 -->
            <div class="grid grid-cols-3 gap-2 text-xs bg-gray-50 p-2 border rounded">
                <div>處方日期：{{ detail.處方日期 }}</div>
                <div>處方碼段：{{ detail.碼段 }}</div>
                <div>診別：{{ detail.診別 }}</div>
                <div>病歷編號：{{ detail.病歷號 }}</div>
                <div>病患姓名：{{ detail.姓名 }}</div>
                <div>包藥天數：{{ detail.包藥天數 }}</div>
                <div>診斷代碼：{{ detail.診斷代碼 }}</div>
            </div>

            <!-- 診療項目 -->
            <div class="mt-2">
                <DataTable :value="treatments" class="text-sm" scrollable scrollHeight="100px">
                <Column field="項目" header="醫令名稱" />
                <Column field="數量" header="數量" />
                </DataTable>
            </div>

            <!-- 按鈕列 -->
            <div class="flex justify-between mt-4 flex-wrap gap-2">
                <Button label="首筆" icon="pi pi-angle-double-left" outlined @click="goFirst" />
                <Button label="上筆" icon="pi pi-angle-left" outlined @click="goPrev" />
                <Button label="下筆" icon="pi pi-angle-right" outlined @click="goNext" />
                <Button label="尾筆" icon="pi pi-angle-double-right" outlined @click="goLast" />
                <Button label="修改" icon="pi pi-pencil" outlined @click="editRecord" />
                <Button label="刪除" icon="pi pi-trash" outlined @click="deleteRecord" />
                <Button label="選擇處方" icon="pi pi-search" outlined @click="selectPrescription" />
                <Button label="存檔" icon="pi pi-save" @click="saveRecord" />
                <Button label="新增" icon="pi pi-plus" @click="addRecord" />
                <Button label="查詢" icon="pi pi-search" outlined @click="searchRecord" />
                <Button label="列印" icon="pi pi-print" outlined @click="printRecord" />
                <Button label="離開" icon="pi pi-sign-out" outlined @click="visible = false" />
            </div>
        </div>
    </Dialog>
</template>