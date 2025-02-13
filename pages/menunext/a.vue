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
                <p>test1</p>
            </Button>
        </div>
   
        <div class="flex justify-center items-center h-full">        
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/')">
                <i class="pi pi-user !text-4xl"></i>
                <p>test2</p>
            </Button>
        </div>
     
    <NuxtLink to="/menunext/a3">
        <Button label="Submit">
            <i class="pi pi-user">

            </i>
        </Button>
        <p>系統參數設定</p>
    </NuxtLink>

    <NuxtLink to="/menunext/a4">4</NuxtLink>
    <NuxtLink to="/menunext/a5">5</NuxtLink>
    <NuxtLink to="/menunext/a6">6</NuxtLink>
    <NuxtLink to="/menunext/a7">7</NuxtLink>
    <NuxtLink to="/menunext/a8">8</NuxtLink>
    <NuxtLink to="/menunext/a9">9</NuxtLink>
    <NuxtLink to="/menunext/a10">10</NuxtLink>
    <NuxtLink to="/menunext/a11">11</NuxtLink>
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