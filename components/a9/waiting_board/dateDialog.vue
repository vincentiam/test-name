<script setup>
//候診看板
const visible = defineModel('visible')
const date = defineModel('date')
const selectTime = defineModel('selectTime')
const boardDialog = defineModel('boardDialog')
</script>

<template>
    <Dialog v-model:visible="visible">
        <template #header>
            <p>請輸入查詢日期</p>
        </template>
        <div class="flex flex-col justify-center items-center w-full">
            <DatePicker v-model="date" inline showWeek class="w-full sm:w-[30rem]"/>
            <div class="flex flex-row w-full" >
                <ButtonGroup class="w-full">
                    <Button class="w-full" :class="selectTime !== '早上' ? '!bg-white !text-black' : '!bg-amber-500 !text-white'" variant="text" label="早上" @click="selectTime='早上'"/>

                    <Button class="w-full" :class="selectTime !== '下午' ? '!bg-white !text-black' : '!bg-amber-500 !text-white'" variant="text" label="下午" @click="selectTime='下午'"/>

                    <Button class="w-full" :class="selectTime !== '晚上' ? '!bg-white !text-black' : '!bg-amber-500 !text-white'" variant="text" label="晚上" @click="selectTime='晚上'"/>
                </ButtonGroup>
            </div>   
        </div>

        <template #footer>
            
            <Button label="取消" @click="visible=false"/>
            
            <Button label="確定" @click="boardDialog=true; visible=false"/>
            
        </template>
    </Dialog>
</template>