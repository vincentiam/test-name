<script setup>
const title = defineModel('title')
const showTimePeriod = defineModel('showTimePeriod')
const beginDate = ref(null)
const endDate = ref(null)
</script>
<template>
    <Dialog v-model:visible="showTimePeriod" modal :header="title">
        <div class="flex flex-col items-center">
            <div class="mb-6">
                <p>開始日期</p>
            </div>
            <div>
                <DatePicker v-model="beginDate" />
            </div>
            <div class="my-3">
                <p>結束日期</p>
            </div>
            <div>
                <DatePicker v-model="endDate" />
            </div>
        </div>
        <div class="mt-6 grid grid-cols-5">
            <div class="col-start-2">
                <Button class="!bg-red-600 hover:!bg-red-700" label="取消" @click="showTimePeriod=false"/>
            </div>
            <div class="col-start-4">           
                <Button label="確定" @click="showTimePeriod=false"/>
            </div>            
        </div>
    </Dialog>
</template>