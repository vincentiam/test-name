<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const router = useRouter()
const password = ref('')
console.log(password.value)

const login = () => {
    if (password.value === 'abc') {
        console.log('1')
        router.push('/menu')
        toast.add({
            severity: 'success',
            summary: '登入成功',
            // detail: 登入成功,
            life: 1500
        })
    }else{
        toast.add({
            severity: 'error',
            summary: '密碼錯誤',
            //detail: 登入失敗,
            life: 1500
        })
        console.log('2')
    }
}
</script>

<template>
    <div class="flex flex-col justify-center items-center bg-[url(~/assets/images/picture.jpg)]">
        <div class="flex flex-col justify-center items-center h-screen w-[20vw]">
            <InputText class="w-full" type="password" v-model="password" placeholder="上機密碼"/>
    
            
            <div class="flex flex-row justify-between w-full px-50vh"> 
            <NuxtLink to="/">
                <Button label="上一頁" />
            </NuxtLink>
                
            <Button class="!bg-indigo-500 hover:!bg-fuchsia-500" label="登入" @click="login"/>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
</style>