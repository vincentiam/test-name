<script setup>
import { ref } from 'vue'
import { Button } from 'primevue/button'
import Dialog from 'primevue/dialog'

const showMessageDialog = ref(false)

const openMessage = () => {
    showMessageDialog.value = true
}
</script>

<template>
    <div>
        <!-- 模擬觸發訊息的按鈕 -->
        <Button label="顯示訊息通知" @click="openMessage" />

        <!-- 訊息通知對話框 -->
        <Dialog v-model:visible="showMessageDialog" modal header="訊息通知" :closable="false" :style="{ width: '25rem' }">
        <div class="flex flex-col items-center text-center">
            <i class="pi pi-info-circle text-blue-500 text-5xl mb-3"></i>
            <p class="text-xl text-gray-800">本功能為醫院級採用批價處結帳專用報表</p>
            <Button label="確定" icon="pi pi-check" class="mt-4" @click="showMessageDialog = false" />
        </div>
        </Dialog>
    </div>
</template>
