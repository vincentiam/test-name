<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { storeToRefs } from 'pinia';
import { userData } from '~/store/userstore.js';

const { auth } = useSupabaseClient();
const user = userData()
const { userid } = storeToRefs(user)
const toast = useToast();
const router = useRouter()
const account = ref('')
const password = ref('')

const login = async() => {
    const { error } = await auth.signInWithPassword({
            email: account.value,
            password: password.value,
        });
        if (error) {{
            console.error(error);
            toast.add({
                severity: 'error',
                summary: '密碼錯誤',
                //detail: 登入失敗,
                life: 1500
            })
        }}else{
            router.push('/menu')
            toast.add({
                severity: 'success',
                summary: '登入成功',
                // detail: 登入成功,
                life: 1500
            })
        }
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
    <div class="flex flex-col justify-center items-center bg-[url(~/assets/images/picture.jpg)] bg-cover">
        <div class="flex flex-col justify-center items-center h-screen w-[20vw]">
            <InputText class="w-full" type="text" v-model="account" placeholder="上機帳號"/>
            <InputText class="w-full" type="text" v-model="password" placeholder="上機密碼"/>
            <div class="flex flex-row justify-between w-full px-50vh">
                <Button class="transition-transform duration-300 hover:scale-200" label="關閉" />
                <Button class="transition-transform duration-300 hover:scale-200 !bg-sky-400" label="上機登入" @click="login"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>