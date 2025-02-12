<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const router = useRouter()
const test = ref('')
console.log(test.value)

const login = () => {
    if (test.value === '123') {
        console.log('1')
        router.push('/password')

    }else{
        toast.add({
            severity: 'error',
            summary: '登入失敗',
            detail: '上機帳號不存在',
            life: 1500
        })
        console.log('2')
    }
}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen bg-[url(/images/picture.png)]">
        <InputText type="text" v-model="test" placeholder="上機帳號"/>

        
        <div class="flex flex-row px-50vh">
        <Button class="!bg-indigo-500 hover:!bg-fuchsia-500" label="輸入上機密碼" @click="login"/>



            <Button label="關閉" />
        </div>
    </div>
    
</template>

<style scoped>
</style>