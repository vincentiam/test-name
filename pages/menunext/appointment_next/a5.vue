<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const dialogView = ref(false) 

const dialogInput = ref('')

const radioOption = ref('')
const radioOptionTwice = ref('')
</script>
<template>
    <div>
        <div class="flex flex-col h-screen gap-20 items-center justify-center" >
            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click=" dialogView=true">
                <i class="pi pi-user !text-4xl"></i>
                <p>補印單一掛號收據</p>
            </Button>

            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment_next/a5_2')">
                <i class="pi pi-user !text-4xl"></i>
                <p>補印多筆掛號收據</p>
            </Button>

            <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment')">
                <i class="pi pi-user !text-4xl"></i>
                <p>上一頁</p>
            </Button>
        </div>
        <Dialog v-model:visible="dialogView">
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
                
                <Button label="取消" @click="dialogView=false"/>
                
                <Button label="確定" @click="trueNexta1_1"/>
                
            </template>
        </Dialog> 
    </div>
    
</template>