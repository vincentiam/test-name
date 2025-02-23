<script setup >
import { ref, watch } from 'vue';
const name = ref(null)
const date = ref(null)
const id = ref(null)
const phonecall = ref(null)
const address = ref(null)

watch(phonecall,()=>{
     
    if (phonecall.value.length > 2){
        phonecall.value = phonecall.value.replace(/^(\d{2})(\d+)/, '$1-$2')
    }
})
</script>

<template>

    <div class="flex flex-col justify-center items-center bg-[url(~/assets/images/picture.jpg)] bg-cover">
        <div class="flex flex-col justify-center items-center h-screen w-[20vw]">
            <InputText class="w-full" type="text" v-model="name" placeholder="姓名"/>
            <InputText class="w-full" type="date" v-model="date" placeholder="出生年月日"/>
            <InputText class="w-full" type="text" v-model="id" placeholder="身分證字號" maxlength="10"/>
            <InputText class="w-full" type="tel" v-model="phonecall" placeholder="電話" maxlength="10" pattern="[0-0]{1}[1-8]{1}-[0-9]{8}"/>
            <InputText class="w-full" type="text" v-model="address" placeholder="地址"/>
            
            <div class="flex flex-row justify-between w-full px-50vh"> 
            <NuxtLink to="/menunext/appointment">
                <Button class="transition-transform duration-300 hover:scale-200" label="取消" />
            </NuxtLink>
                
            <Button class="transition-transform duration-300 hover:scale-200 !bg-sky-400" label="確定" />
            </div>
        </div>
    </div>
</template>