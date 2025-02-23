<script setup>
import { ref } from 'vue'
const changeDialog = ref(false)
const date = ref(null)
// 掛號呈現內容
const content = ref(Array.from({ length:50 },(_,i) => i+1))


//診別選單
const objectSelectContent = ref(null)
const objectSelectOption = [
    {name: '診別一', value:'診別一' },
    {name: '診別二', value:'診別二' },
    {name: '診別三', value:'診別三' }
]

// 掛號時間選單
const timeSelectContent = ref(null)
const timeSelectOption = [
    {name: '1', value:'1' },
    {name: '2', value:'2' },
    {name: '3', value:'3' }
]

// 病歷號碼病歷號碼選單
const numberSelectContent = ref(null)
const numberSelectOption = [
    {name: '1', value:'1' },
    {name: '2', value:'2' },
    {name: '3', value:'3' }
]

// 無處方簽章筆數
const prescription = ref(0)
</script>
<template>
    <div class="flex flex-col">
        <div class=" bg-orange-100 w-full p-2">
            <div class="grid grid-cols-16">
                <div class="col-span-5">
                    <label class="text-2xl">尚未就診掛號紀錄</label>
                </div>
                <div class="col-span-9 flex flex-row items-center gap-2">
                    <label class="text-lg">掛號日期:</label>
                
                    <DatePicker v-model="date" />

                    
                    <Button label="-" />
                    

                    <label class="text-lg">診別:</label>
                
                    <Select v-model="objectSelectContent" :options="objectSelectOption" optionLabel="name" placeholder="診別" class="w-full md:w-56" size="small"/>
                </div>
                <div class="col-span-2 col-end-17 flex flex-row items-center gap-2">
                    
                    <Button label="T處方重印" />
                    
                </div>
            </div>
            <div class="grid grid-cols-16">
                <div class="col-span-5 flex flex-col">
                    <label class="text-2xl">預約掛號紀錄</label>
                    <label class="text-2xl">該時段掛號紀錄</label>
                </div>
                <div class="col-span-5 flex flex-row items-center gap-2">
                    <label class="text-lg">掛號時段:</label>
                
                    <Select v-model="timeSelectContent" :options="timeSelectOption" optionLabel="name" placeholder="掛號時段" class="w-full md:w-56" size="small"/>
                </div>
            </div>
            <div class="grid grid-cols-16 py-2">
                <div class="col-span-5">
                    <label class="text-2xl">查詢某病患掛號紀錄</label>
                </div>
                <div class="col-span-9 flex flex-row items-center gap-2">
                    <label class="text-lg">病歷號碼:</label>
                
                    <Select v-model="numberSelectContent" :options="numberSelectOption" optionLabel="name" placeholder="病歷號碼" class="w-full md:w-56" size="small"/>

                    <Button label="" />
                    
                    <label class="text-lg">無處方簽章筆數: {{ prescription }}</label>
                </div>
            </div>
            <div class="grid grid-cols-16">
                <div class="col-span-5">
                    <label class="text-3xl">預約掛號呈現</label>
                </div>
                <div class="col-span-2 col-end-15 flex items-center">
                    <label class="text-2xl">筆數: {{content.length}}</label>
                </div>
                <div class="flex flex-row col-span-2 col-end-17">
                    <Button label="顯示" />
                    <Button label="刪改" class=" !bg-red-500" @click="changeDialog =true"/>
                </div>
            </div>
        </div>
        <div class="flex flex-col p-2">
            
            <div class="grid grid-cols-5 grid-rows-6 gap-3">
                <label v-for="(item) in content">
                    {{ item }}
                </label>
            </div>
        </div>
    </div>
    
    
    <Dialog v-model:visible="changeDialog" modal header="刪除" :style="{ width: '25rem' }">
        <div>
            <div class="flex flex-col">
                <RadioButton/>
                <label v-for="(item) in content" class="text-3xl">
                    {{ item }}
                </label>
            </div>

        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="visible = false"></Button>
        </div>
    </Dialog>
    
</template>