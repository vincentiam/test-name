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
<InputText type="text" v-model="test" />

<br>

<Button class="!bg-indigo-500 hover:!bg-fuchsia-500" label="登入" @click="login"/>

</template>

<style scoped>
</style>