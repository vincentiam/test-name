<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import { userData } from '~/store/userstore.js'
import {useRouter} from 'vue-router'
const router = useRouter()

const user = userData()
const { userid } = storeToRefs(user)
const dialogInput = ref('')

//一般掛號作業
const showSearchDialog = ref(false) 
const title =ref("請輸入掛號病患的查詢條件")

const column = defineModel('column')



//補卡還卡作業
const showCard = ref(false) 
const card =ref("請輸入補卡還卡病患的查詢條件")

const trueNext = (r) => {
    showCard.value=false 
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
        <div class="flex flex-row justify-end  w-full"> 
            <label class="text-xl">上機代號{{ userid }}</label>
        </div>
        <div class="grid grid-cols-4 grid-rows-3 gap-4 p-4 h-screen">
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click=" showSearchDialog=true ">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>一般掛號作業</p>
                </Button>
            </div>
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a2')">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>預約掛號作業</p>
                </Button>
            </div>
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a3')">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>掛號查詢刪改</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a4')">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>病患資料輸入</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a5')">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>補印掛號收據</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click=" showCard=true ">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>補卡還卡作業</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click=" showSearchDialog=true ">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>事後欠卡登記</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a5')">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>查詢欠卡患者</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a6')">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>其它資訊查詢</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a1')">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>還卡明細表</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a1')">
                    <i class="pi pi-user !text-4xl"></i>
                    <p>其它報表列印</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/')">
                    <i class="pi pi-sign-out !text-4xl"></i>
                    <p>關閉</p>
                </Button>
            </div>
        </div>
        <SearchDialog v-model:showSearchDialog="showSearchDialog" v-model:title="title" v-model:dialogInput="dialogInput" v-model:column="column" @confirm="trueNext('a1_1')"/>
        <SearchDialog v-model:showSearchDialog="showCard" v-model:title="card" v-model:dialogInput="dialogInput" v-model:column="column" @confirm="trueNext('a6') "/>
    </div>
</template>