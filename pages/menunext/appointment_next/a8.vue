<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const showTimePeriod = ref(false) 
const title =ref("輸入查詢欠卡資料日期區間")

const showSearchDialog = ref(false)
const searchTitle = ref("請輸入病患的查詢條件")
const dialogInput = ref("")
const column = ref("")

const trueNext = (r) => {
    showSearchDialog.value=false 
    router.push({
        path: `/menunext/appointment_next/${r}`,
        query: {
            filter: dialogInput.value,
            column: column.value,
        }
    });   
}
</script>
<template>
    <div>
        <div class="flex flex-col h-screen gap-20 items-center justify-center" >
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click=" showTimePeriod=true">
                <i class="pi pi-user !text-4xl"></i>
                <p>依日期查詢</p>
            </Button>
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="showSearchDialog=true">
                <i class="pi pi-user !text-4xl"></i>
                <p>依病患查詢</p>
            </Button>
            <Button class="transition-transform 5duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment')">
                <i class="pi pi-user !text-4xl"></i>
                <p>上一頁</p>
            </Button>
        </div>
        <TimePeriod v-model:showTimePeriod="showTimePeriod" v-model:title="title" />
        <SearchDialog v-model:showSearchDialog="showSearchDialog" v-model:title="searchTitle" v-model:dialogInput="dialogInput" v-model:column="column" @confirm="trueNext('a8_1') "/>
    </div>
</template>