<script setup>
const supabase = useSupabaseClient();
const title = defineModel('title')
const showTimePeriod = defineModel('showTimePeriod')
const beginDate = ref(null)
const endDate = ref(null)
const selectTime = ref(null)
const selectUser = ref(null)
const selectSort = ref(null)

const optionsTime = ref([
    {name:'早上',code:'morning'},
    {name:'下午',code:'afternoon'},
    {name:'晚上',code:'night'}
])
const optionsUser = ref([])
const optionsSort = ref([
    {name:'以日期排序',code:'date'},
    {name:'以病歷號碼排序',code:'id'},
])

onMounted(async()=>{
    const { data, error } = await supabase.from('staff').select('*')
    if(error){
        console.log(error.message)
    }
    data.forEach((item) =>{
        optionsUser.value.push({name:item.staff_name,code:item.staff_id})
    } )
})
</script>
<template>
    <Dialog v-model:visible="showTimePeriod" modal :header="title">
        <div class="flex flex-col w-[90%]">
            <div>
                <p>開始日期</p>
            </div>
            <div>
                <DatePicker v-model="beginDate" class="w-full"/>
            </div>
            <div class="mt-3">
                <p>結束日期</p>
            </div>
            <div>
                <DatePicker v-model="endDate" class="w-full"/>
            </div>
            <div class="mt-3">
                <p>結帳時段</p>
            </div>
            <div class="w-full">
                <Select v-model="selectTime" :options="optionsTime" optionLabel="name" class="w-full" />   
            </div>

            <div class="mt-3">
                <p>批價人員</p>
            </div>
            <div class="w-full">
                <Select v-model="selectUser" :options="optionsUser" optionLabel="name" class="w-full" />   
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