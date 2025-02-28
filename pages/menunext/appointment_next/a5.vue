<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const showSearchDialog = ref(false) 
const title =ref("請輸入補印收據的病患查詢條件")
const dialogInput =ref('')
const showLetterDialog = ref(false)

const to_a5_1 = () => {
    showSearchDialog.value=false 
    router.push({
        path: '/menunext/appointment_next/a5_1',
        query: { filter: dialogInput.value}
    });   
}
</script>
<template>
    <div>
        <div class="flex flex-col h-screen gap-20 items-center justify-center" >
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click=" showSearchDialog=true">
                <i class="pi pi-user !text-4xl"></i>
                <p>補印單一掛號收據</p>
            </Button>
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="showLetterDialog=true">
                <i class="pi pi-user !text-4xl"></i>
                <p>補印多筆掛號收據</p>
            </Button>

            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment')">
                <i class="pi pi-user !text-4xl"></i>
                <p>上一頁</p>
            </Button>
        </div>
        <SearchDialog v-model:showSearchDialog="showSearchDialog" v-model:title="title" v-model:dialogInput="dialogInput" @confirm="to_a5_1"/>
        <Letter v-model="showLetterDialog" />
    </div>
    
</template>