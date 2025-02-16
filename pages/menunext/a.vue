<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import { userData } from '~/store/userstore.js'
import {useRouter} from 'vue-router'
const router = useRouter()

const user = userData()
const { userid } = storeToRefs(user)
const dialogview = ref(false) 

</script>

<template>
    <div class="flex flex-row justify-end  w-screen"> 
    <label class="text-xl">上機代號{{ userid }}</label>
    </div>
    <div class="grid grid-cols-4 grid-rows-3 gap-4 p-4 h-screen">
        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>一般掛號作業</p>
            </Button>
        </div>
   
        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>預約掛號作業</p>
            </Button>
        </div>
     
        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>掛號查詢刪改</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>病患資料輸入</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>補印掛號收據</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>補卡還卡作業</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>事後欠卡登記</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>查詢欠卡患者</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>其它資訊查詢</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
                <i class="pi pi-user !text-4xl"></i>
                <p>還卡明細表</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a_next/a1')">
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
   
    <Dialog v-model:visible="dialogview">
        <template #header>
            <p>header</p>
        </template>
        <p>test</p>
        <template #footer>
            
            <Button label="取消" @click="dialogview=false"/>
            
            <Button label="確定" @click="dialogview=false"/>
            
        </template>
    </Dialog>
    </div>
</template>