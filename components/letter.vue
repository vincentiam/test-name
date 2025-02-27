<script setup>
    const showDialog = defineModel()

    const chartNumber = ref(null)
    const startDate = ref(null)
    const endDate = ref(null)

    const products = ref(
        [
            {
                number:'1',
                name:'1',
                cardID:'1',
                registrationFee:'1',
                deductible:'1',
                oweCard:'1',
                onsultingNumber:'1',
                appointmentNumber:'1',
                triage:'1',
                HIS_REG_SERIAL:'1',
            },
            {
                number:'2',
                name:'2',
                cardID:'2',
                registrationFee:'2',
                deductible:'2',
                oweCard:'2',
                onsultingNumber:'2',
                appointmentNumber:'2',
                triage:'2',
                HIS_REG_SERIAL:'2',
            }
        ]
    )

    const choose = ref (null)
</script>
<template>

    <Dialog v-model:visible="showDialog" modal header="Edit Profile" :style="{ width: '80rem' }">
        <div>
            
            <DataTable :value="products" tableStyle="min-width: 50rem">
                <Column field="number" header="病歷號碼"></Column>
                <Column field="name" header="姓名"></Column>
                <Column field="cardID" header="卡號"></Column>
                <Column field="registrationFee" header="掛號費"></Column>
                <Column field="deductible" header="自付額"></Column>
                <Column field="oweCard" header="是否欠卡"></Column>
                <Column field="consultingNumber" header="診號"></Column>
                <Column field="appointmentNumber" header="診號"></Column>
                <Column field="triage" header="傷病分類"></Column>
                <Column field="HIS_REG_SERIAL" header="HIS_REG_SERIAL"></Column>
            </DataTable>
            
        </div>
        <div class="grid grid-cols-16 grid-rows-4">
            <div class="col-start-1">
                <label>選項</label>
            </div>
            <div class="flex flex-row row-start-2 col-span-6">
                <div class="flex flex-row justify-center mr-2 items-center">
                    <RadioButton v-model="choose" value="健保" inputId="健保" />
                    <label>健保</label>
                    <RadioButton v-model="choose" value="自費" inputId="自費" />
                    <label>自費</label>
                    <RadioButton v-model="choose" value="全部" inputId="全部" />
                    <label>全部</label>
                </div>
                <div class="flex flex-row justify-center items-center">
                    <label>病歷號碼:</label>
                    <InputText type="text" v-model="chartNumber" size="small" />       
                </div>
            </div>
            <div class="flex flex-col row-start-2 col-start-7 col-span-4">
                <div class="flex flex-row items-center">
                    <label>起始日期:</label>
                    <DatePicker v-model="startDate" />
                </div>
                <div class="flex flex-row items-center">
                    <label>終止日期:</label>
                    <DatePicker v-model="endDate" />
                </div>
            </div>
        </div>
    </Dialog>
    
</template>