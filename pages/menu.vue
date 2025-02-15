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
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/a')">
                <i class="material-icons !text-6xl">search</i>
                <p>病患掛號作業</p>
            </Button>
        </div>
   
        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>醫師問診作業</p>
            </Button>
        </div>
     
        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>系統參數設定</p>
            </Button>
        </div>        
        
        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>健保門診申報</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>批價記帳作業</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>主管管理作業</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>資料備份作業</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>輔助擴充作業</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>藥局處方列印</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>藥品庫存管理</p>
            </Button>
        </div>

        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>會計帳款作業</p>
            </Button>
        </div>
        
        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="material-icons !text-6xl">search</i>
                <p>人事薪資管理</p>
            </Button>
        </div>

    <NuxtLink to="/">
        
        <Button label="關閉" >
            <i class="pi pi-sign-out">

            </i>
        </Button>
    </NuxtLink>

   
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