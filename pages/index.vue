<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const test = ref('')
console.log(test.value)

const login = () => {
    if (test.value === '123') {
        console.log('1')
        router.push('/text')
    }else{
        console.log('2')
    }
}
</script>
<template>
<input v-model="test">
<br>
<button @click="login">登入</button>
</template>
<style scoped></style>