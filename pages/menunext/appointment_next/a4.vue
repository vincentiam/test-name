<script setup >
import { ref, computed } from 'vue';
const name = ref(null)
const date = ref(null)
const id = ref(null)
const phone = ref('')
const address = ref(null)

const currentMask = computed(() => {
    // 如果以 "09" 開頭且字數小於或等於 10，視為行動電話格式
    if (phone.value.length >=2){
        if (phone.value.startsWith("09")) {
            // 行動電話格式：0912-345-678 (10位數)
            return '9999-999-999'
        }
        // 如果以 "0" 開頭且字數小於或等於 9，視為市話格式
        else if (phone.value.startsWith("0")) {
            // 市話格式：01-234-5678 (9位數)
            return '99-999-9999'
        }
    }
    // 預設格式（可根據需求調整）
    return '9999-999-999'
})
</script>

<template>

    <div class="flex flex-col justify-center items-center bg-[url(~/assets/images/picture.jpg)] bg-cover">
        <div class="flex flex-col justify-center items-center h-screen w-[20vw]">
            <InputText class="w-full" type="text" v-model="name" placeholder="姓名"/>
            <InputText class="w-full" type="date" v-model="date" placeholder="出生年月日"/>
            <InputText class="w-full" type="text" v-model="id" placeholder="身分證字號" maxlength="10"/>
            <InputMask class="w-full" type="text" v-model="phone" :mask="currentMask"/>
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