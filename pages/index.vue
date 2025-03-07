<script setup>
import { ref } from 'vue'

const supabase = useSupabaseClient()
const newName = ref('')
const message = ref('')

const addRecord = async () => {
    if (!newName.value) {
        message.value = '請輸入名稱'
        return
    }

    const { error } = await supabase.from('receipt').insert([
        { user: newName.value, date: "2025/03/02"}
    ])

    if (error) {
        message.value = `錯誤: ${error.message}`
    } else {
        message.value = '資料新增成功！'
        newName.value = ''
        fetchRecords()
    }
}

const dataset = ref([])

const fetchRecords = async () => {
    const { data, error } = await supabase.from('receipt').select('*')
    if(error) {
        console.error('error', error)
    } else {
        dataset.value = data
    }
}

const dataDeletePop = async() => {
    const { error } = await supabase.from('receipt').delete().eq('user', dataset.value.slice(-1)[0].user)

    if (error) {
        message.value = `刪除失敗: ${error.message}`
    } else {
        message.value = '資料刪除成功！'
        fetchRecords() // ✅ 刪除後更新列表
    }
}

onMounted(() => {
    fetchRecords()
})
</script>

<template>
    <div class="p-4">
    <h1 class="text-2xl font-bold">新增資料到 Supabase</h1>

    <input
        v-model="newName"
        placeholder="輸入名稱"
        class="border p-2 mt-4"
    />
    <button @click="addRecord" class="bg-blue-500 text-white px-4 py-2 ml-2">
        新增資料
    </button>

    <p class="mt-4 text-red-500">{{ message }}</p>
    
    <br>

    
    <DataTable :value="dataset" tableStyle="min-width: 50rem">
        <Column field="user" header="user"></Column>
        <Column field="date" header="date"></Column>
    </DataTable>
    
    <br>
    
    
    <Button label="刪除資料" @click="dataDeletePop"/>
    
  </div>
</template>