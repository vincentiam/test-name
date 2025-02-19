<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { storeToRefs } from 'pinia';
import { userData } from '~/store/userstore.js';
const user = userData()
const { userid } = storeToRefs(user)
const toast = useToast();
const router = useRouter()
const account = ref('')
console.log(account.value)

const login = () => {
    if (account.value === '123') {
        console.log('登入成功')

        user.setId(account)
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
    <div class="flex flex-col justify-center items-center bg-[url(~/assets/images/picture.jpg)] bg-cover">
        <div class="flex flex-col justify-center items-center h-screen w-[20vw]">
            <InputText class="w-full" type="text" v-model="account" placeholder="上機帳號"/>
            <div class="flex flex-row justify-between w-full px-50vh">
                <Button class="transition-transform duration-300 hover:scale-200" label="關閉" />
                <Button class="transition-transform duration-300 hover:scale-200 !bg-sky-400" label="輸入上機密碼" @click="login"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>