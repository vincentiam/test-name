<script setup>
    import { useToast } from 'primevue/usetoast';
    const toast = useToast();
    const supabase = useSupabaseClient()

    // 掛號日期
    const date = ref(null)
    const formatDate = (d) => {
        const date_temp = new Date(d);
        const year = date_temp.getFullYear();
        const month = String(date_temp.getMonth() + 1).padStart(2, '0');
        const day = String(date_temp.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`
    }

    // 掛號內容
    const content = ref([])

    // 診別選單
    const objectSelectContent = ref(null)
    const objectSelectOption = [
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' }
    ]

    // 掛號時段
    const timeSelectContent = ref(null)
    const timeSelectOption = [
        { name: '早上', value: '早上' },
        { name: '下午', value: '下午' },
        { name: '晚上', value: '晚上' }
    ]

    // 病歷號碼選單
    const numberContent = ref(null)

    // 無處方簽章筆數
    const prescription = ref(0)

    // 篩選後內容
    const filteredContent = computed(() => {
        console.log(objectSelectContent.value)
        return content.value.filter(item => {
            const timeMatch = !timeSelectContent.value || item.booking_time === timeSelectContent.value.value
            const dateMatch = !date.value || item.booking_date === formatDate(date.value)
            const chartMatch = !numberContent.value || item.users.users_medicalHistoryNumber.includes(numberContent.value)
            const clinicMatch = !objectSelectContent.value || item.booking_clinic === objectSelectContent.value.value
            return timeMatch && dateMatch && chartMatch && clinicMatch
        })
    })

    // 取得資料並初始化病歷號碼選單
    const fetchData = async () => {
    const { data, error } = await supabase.from('booking').select(`*,users(users_name,users_medicalHistoryNumber)`)
    if (error) {
        console.error('error', error)
    } else {
        content.value = data
    }
    }
    const changeDialog = ref(false)
    const radioOption = ref([])
    const buttonDisabled =ref(true)

    const changeArray = async () => {
        console.log(radioOption.value)
        radioOption.value = radioOption.value.map(item => Number(item))
        const { data, error } = await supabase
            .from('booking')
            .delete()
            .in('booking_number', radioOption.value)

        if (error) {
            console.log(error.message)
            toast.add({
                severity: 'error',
                summary: '刪除失敗',
                life: 1500
            })
        } else {
            console.log('資料刪除成功！')
            toast.add({
                severity: 'success',
                summary: '刪除成功',
                life: 1500
            })
            fetchData()
        }
        changeDialog.value = false
    }


    const showDialog =() => {
        console.log(content.value)
        radioOption.value = []
        changeDialog.value =true
    }

    onMounted(async() => {
        const { data, error } = await supabase
            .from('booking')
            .delete()
            .in('booking_number', [2,3])
        fetchData()
    })
</script>

<template>
    <div class="flex flex-col">
    <!-- 上方表單選單區 -->
        <div class="bg-orange-100 w-full p-2">
        <!-- 掛號日期與診別 -->
            <div class="grid grid-cols-16">
                <div class="col-span-5">
                    <label class="text-2xl">尚未就診掛號紀錄</label>
                </div>
                <div class="col-span-9 flex flex-row items-center gap-2">
                    <label class="text-lg">掛號日期:</label>
                    <DatePicker v-model="date" />
                    <Button label="-" />
                    <label class="text-lg">診別:</label>
                    <Select
                        v-model="objectSelectContent"
                        :options="objectSelectOption"
                        optionLabel="name"
                        placeholder="診別"
                        class="w-full md:w-56"
                        size="small"
                    />
                </div>
            </div>

        <!-- 掛號時段 -->
        <div class="grid grid-cols-16">
            <div class="col-span-5 flex flex-col">
                <label class="text-2xl">預約掛號紀錄</label>
                <label class="text-2xl">該時段掛號紀錄</label>
            </div>
            <div class="col-span-5 flex flex-row items-center gap-2">
                <label class="text-lg">掛號時段:</label>
                <Select
                    v-model="timeSelectContent"
                    :options="timeSelectOption"
                    optionLabel="name"
                    placeholder="掛號時段"
                    class="w-full md:w-56"
                    size="small"
                />
            </div>
        </div>

        <!-- 病歷號碼查詢 -->
        <div class="grid grid-cols-16 py-2">
            <div class="col-span-5">
                <label class="text-2xl">查詢某病患掛號紀錄</label>
            </div>
            <div class="col-span-9 flex flex-row items-center gap-2">
                <label class="text-lg">病歷號碼:</label>
                <InputText type="text" v-model="numberContent" />
            </div>
        </div>

        <!-- 筆數呈現 -->
        <div class="grid grid-cols-16">
            <div class="col-span-5">
                <label class="text-3xl">預約掛號呈現</label>
            </div>
            <div class="col-span-2 col-end-15 flex items-center">
                <label class="text-2xl">筆數: {{ filteredContent.length }}</label>
            </div>
            <div class="flex flex-row col-span-2 col-end-17">
                <Button label="顯示" />
                <Button label="刪改" class=" !bg-red-500" @click="showDialog()"/>
            </div>
        </div>
        </div>

        <!-- 資料顯示區 -->
        <div v-if="filteredContent.length > 0" class="flex flex-col p-2">
        <div class="grid grid-cols-3 grid-rows-6 gap-3">
            <label v-for="(item) in filteredContent" :key="item.id" class="grid grid-cols-5">
            <div class="grid-start-1">{{ item.booking_number }}</div>
            <div class="grid-start-2">{{ item.users.users_name }}</div>
            </label>
        </div>
        </div>

        <!-- 無資料提示 -->
        <div v-else class="text-red-500 text-3xl pl-6 mt-4">
        <p>無預約資料</p>
        </div>

        <Dialog v-model:visible="changeDialog" modal header="刪除" :style="{ width: '25rem' }">
            <div calss="flex flex-col">
                <div v-for="(item,index) in content" class="flex flex-row items-center text-3xl">
                    <Checkbox v-model="radioOption" :value="item.booking_number" @click="buttonDisabled=true"/>
                    <div class="w-full grid grid-cols-4">
                        <div class="grid-start-1">
                            {{ item.booking_number }}
                        </div>
                        <div class="grid-start-3">
                            {{ item.users.users_name }}
                        </div>
                    </div>
                </div>

            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="刪除" class=" !bg-red-500 !text-white" severity="secondary" @click="buttonDisabled = false"></Button>
                <Button type="button" label="儲存" @click="changeArray " :disabled="buttonDisabled"></Button>
            </div>
        </Dialog>
    </div>
</template>
