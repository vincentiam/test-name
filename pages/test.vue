<script setup>
    const { auth } = useSupabaseClient();
    const email = ref('');
    const password = ref('');

    async function signInWithEmail() {
        // > 嘗試透過信箱+密碼登入
        const { error } = await auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });
        if (error) {{
            console.error(error);
        }}else{
            navigateTo('/')
        }
    }
</script>

<template>
    <div class="flex flex-col items-start gap-3">
        <label>電子郵件</label>
        <InputText v-model="email" type="text" />
        <label>密碼</label>
        <InputText v-model="password" type="text" />

        <Button label="登入" @click="signInWithEmail" />
    </div>
</template>