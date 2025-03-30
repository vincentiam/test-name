    <script setup>
    const supabase = useSupabaseClient()

    // 掛號日期
    const date = ref(null)
    const formatDate = (d) => d ? d.toISOString().split('T')[0] : null

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
    const numberSelectContent = ref(null)
    const numberSelectOption = ref([])

    // 無處方簽章筆數
    const prescription = ref(0)

    // 篩選後內容
    const filteredContent = computed(() => {
    return content.value.filter(item => {
        const timeMatch = !timeSelectContent.value || item.booking_time === timeSelectContent.value
        const dateMatch = !date.value || item.booking_date === formatDate(date.value)
        const chartMatch = !numberSelectContent.value || item.chart_no === numberSelectContent.value
        return timeMatch && dateMatch && chartMatch
    })
    })

    // 取得資料並初始化病歷號碼選單
    const fetchData = async () => {
    const { data, error } = await supabase.from('booking').select(`*,users(users_name)`)
    if (error) {
        console.error('error', error)
    } else {
        content.value = data

        const chartNos = [...new Set(data.map(d => d.chart_no))]
        numberSelectOption.value = chartNos.map(n => ({ name: n, value: n }))
    }
    }

    onMounted(() => {
    fetchData()
    })
    </script>

    <template>
        <div class="flex flex-col">
        <div class="bg-orange-100 w-full p-2">
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
            <div class="col-span-2 col-end-17 flex flex-row items-center gap-2">
                <Button label="T處方重印" />
            </div>
            </div>
    
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
    
            <div class="grid grid-cols-16 py-2">
            <div class="col-span-5">
                <label class="text-2xl">查詢某病患掛號紀錄</label>
            </div>
            <div class="col-span-9 flex flex-row items-center gap-2">
                <label class="text-lg">病歷號碼:</label>
                <Select
                v-model="numberSelectContent"
                :options="numberSelectOption"
                optionLabel="name"
                placeholder="病歷號碼"
                class="w-full md:w-56"
                size="small"
                />
                <Button label="" />
                <label class="text-lg">無處方簽章筆數: {{ prescription }}</label>
            </div>
            </div>
    
            <div class="grid grid-cols-16">
            <div class="col-span-5">
                <label class="text-3xl">預約掛號呈現</label>
            </div>
            <div class="col-span-2 col-end-15 flex items-center">
                <label class="text-2xl">筆數: {{ filteredContent.length }}</label>
            </div>
            <div class="col-span-2 col-end-17">
                <Button label="顯示" />
            </div>
            </div>
        </div>
    
        <div class="flex flex-col p-2">
            <div class="grid grid-cols-3 grid-rows-6 gap-3">
            <label v-for="(item) in filteredContent" class="grid grid-cols-5">
                <div class="grid-start-1">
                {{ item.booking_number }}
                </div>
                <div class="grid-start-2">
                {{ item.users.users_name }}
                </div>
            </label>
            </div>
        </div>
        </div>
    </template>  