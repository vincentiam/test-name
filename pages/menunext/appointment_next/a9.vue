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
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>候診看板</p>
                </Button>
            </div>
        
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>醫師排班查詢</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>欠款登記簿</p>
                </Button>
            </div>        
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>修改患者的病歷號碼</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>列印病患基本資料</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>現金收入日報表</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>列印掛號結帳單</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>修改下一病歷號碼</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>設定病患免收關係人</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>全部病患基本資料</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>IC卡讀卡機認證</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>安裝IC卡讀卡機</p>
                </Button>
            </div>

            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>每日上傳作業</p>
                </Button>
            </div>

            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>IC卡卡片更新作業</p>
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