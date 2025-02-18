<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import { userData } from '~/store/userstore.js'
import {useRouter} from 'vue-router'
const router = useRouter()

const user = userData()
const { userid } = storeToRefs(user)
const dialogview = ref(false) 

const dialogInput = ref('')

const radioOption = ref('')
const radioOptionTwice = ref('')
</script>

<template>
    <div>
        <div class="flex flex-row justify-end  w-full"> 
            <label class="text-xl">上機代號{{ userid }}</label>
        </div>
        <div class="grid grid-cols-4 grid-rows-3 gap-4 p-4 h-screen">
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click=" dialogview=true ">
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
        </div>

        <Dialog v-model:visible="dialogview">
            <template #header>
                <p>一般掛號作業</p>
            </template>
            
            <div class="flex flex-col">
                <div class="mb-6">
                    <div>
                        <RadioButton v-model="radioOption" inputId="rb1" name="group" value="1"/>
                        <label for="rb1">One</label>
                    </div>
                    <div v-if="radioOption==='1'">
                        <div class="ml-6">
                            <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="1-1"/>
                            <label for="rb1">One-1</label>
                        </div>
                        <div class="ml-6">
                            <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="1-2"/>
                            <label for="rb1">One-2</label>
                        </div>
                    </div>
                    <div>
                        <RadioButton v-model="radioOption" inputId="rb2" name="group" value="2"/>
                        <label for="rb2">Two</label>
                    </div>
                    <div>
                        <RadioButton v-model="radioOption" inputId="rb3" name="group" value="3"/>
                        <label for="rb3">Three</label>
                    </div>
                </div>

                <InputText type="text" v-model="dialogInput" />
            </div>
            
            <template #footer>
                
                <Button label="取消" @click="dialogview=false"/>
                
                <Button label="確定" @click="dialogview=false"/>
                
            </template>
        </Dialog>
    </div>
</template>