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
    <div class=" w-full">
        <div class="flex flex-row justify-end"> 
            <label class="text-xl">上機代號{{ userid }}</label>
        </div>
        <div class="grid grid-cols-4 grid-rows-3 gap-4 p-4 h-screen">
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>門診治療人次月報表</p>
                </Button>
            </div>
        
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>現金收入日報表</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>門診掛號人次統計表</p>
                </Button>
            </div>        
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>中保會輔導控管報表</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>查詢健保IC卡內容</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>網路掛號付款明細報表</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment')">
                    <i class="pi pi-sign-out !text-4xl"></i>
                    <p>回上一畫面</p>
                </Button>
            </div>
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