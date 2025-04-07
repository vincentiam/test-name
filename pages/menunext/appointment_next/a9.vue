<script setup>
import {ref,watch} from 'vue'
import { storeToRefs } from 'pinia'
import { userData } from '~/store/userstore.js'
import {useRouter} from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod';

const toast = useToast();
const router = useRouter()

const user = userData()
const { userid } = storeToRefs(user)
const dateDialog = ref(false)
const date = ref(null);
const date_roc = ref(null)

const radioSearch = ref('dr')
const searchDialog = ref(false)
const drInput = ref('')
const dateInput = ref(new Date())
const selectTime = ref('早上')

const showMessageDialog = ref(false)
const showIdDialog = ref(false)

const showSearchDialog = ref(false) 
const title =ref("查詢病患的病歷號碼")

const column = defineModel('column')

const idSchema = z.object({
    usersName: z.string({ required_error: '姓名不可為空' }).min(1, '請輸入姓名'),
    newMedicalHistoryNumber: z
    .string({ required_error: '號碼不可為空' })
    .regex(/^\d{6}$/, { message: '必須是剛好 6 位數字（如 000001）' }),
})
const idResolver = ref(zodResolver(idSchema));
const idForm = ref({
    usersName: null,
    usersData: null,
    newMedicalHistoryNumber: null
})
const fetchMedicalHistoryNumber = async() => {
    console.log(idForm.value.usersName)
    const { data, error } = await supabase.from('users').select('*').eq('users_name',idForm.value.usersName)
    if(error){
        console.log(error.message)
    }
    idForm.value.usersData = data[0].users_medical_history_number
    console.log (data)
} 
const idSubmit = async() => {
    const result = idSchema.safeParse(idForm.value);
    if (!result.success) {
        toast.add({
            severity: 'error',
            summary: '登錄失敗',
            detail: '資料填寫錯誤',
            life: 1500
        });
    } else {
        const { error } = await supabase.from('users').update({users_medical_history_number:idForm.value.newMedicalHistoryNumbernewMedicalHistoryNumber}).eq('users_name',idForm.value.usersName)
        if(error){
            console.log(error.message)
            toast.add({
                severity: 'error',
                summary: '修改失敗',
                life: 1500
            })
        }else{
            toast.add({
                severity: 'success',
                summary: '修改成功',
                life: 1500
            })
            newMedicalHistoryNumber.value = null
            usersData.value = null 
            usersName.value = null
        }
    }
}

const printDialog = ref(false)
const condition = ref('recent')
const includeArea = ref(false)
const fields = ref([])
const printTableDialog = ref(false)
const usersDateDialog = ref(null)
const rangeDates = ref(null)
const startNumber = ref(null)
const endNumber = ref(null)
const printDataTable = ref(null)
const openPrintDialog = () => {
    printDialog.value = true
    condition.value = 'recent'
    includeArea.value = false
    fields.value = []
    rangeDates.value = null
    startNumber.value = null
    endNumber.value = null
}
const conditionOptions = [
  { label: '最近複診日期區間', value: 'recent' },
  { label: '病患編號區間資料', value: 'idRange' },
  { label: '初診日期區間資料', value: 'firstVisit' },
  { label: '全部病患基本資料', value: 'all' },
]

const formatDate = (d) => {
    console.log(d)
    const date_temp = new Date(d);
    const year = date_temp.getFullYear();
    const month = String(date_temp.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
    const day = String(date_temp.getDate()).padStart(2, '0');

    const formatted = `${year}-${month}-${day}`;
    console.log(formatted); // 輸出：2025-03-10
    return formatted
}
const printData = () => {
    const printContents = document.getElementById('printTable')?.innerHTML
    const originalContents = document.body.innerHTML

    if (printContents) {
        document.body.innerHTML = printContents
        window.print()
        document.body.innerHTML = originalContents
        location.reload()
    }
}
const printDialogConfirm = async() => {
    
    if (condition.value === 'all'){
        const { data, error } = await supabase.from('users').select('*')
        if(error) {
            console.log(error.message)
        }
        console.log(data)
        printDataTable.value = data
    } else if (condition.value === 'recent'){
        rangeDates.value[0] = formatDate(rangeDates.value[0])
        rangeDates.value[1] = formatDate(rangeDates.value[1])
        const { data, error } = await supabase.from('users').select('*').gte('users_last_date', rangeDates.value[0]).lte('users_last_date', rangeDates.value[1])
        if(error) {
            console.log(error.message)
        }
        console.log(data)
        printDataTable.value = data
    } else if (condition.value === 'idRange'){
        const { data, error } = await supabase.from('users').select('*').gte('users_medical_history_number', startNumber.value)
        .lte('users_medical_history_number', endNumber.value)
        if(error) {
            console.log(error.message)
        }
        console.log(data)
        printDataTable.value = data
    } else {
        rangeDates.value[0] = formatDate(rangeDates.value[0])
        rangeDates.value[1] = formatDate(rangeDates.value[1])
        const { data, error } = await supabase.from('users').select('*').gte('users_start_date', rangeDates.value[0]).lte('users_start_date', rangeDates.value[1])
        if(error) {
            console.log(error.message)
        }
        console.log(data)
        printDataTable.value = data
    }
    
    printTableDialog.value = true
    rangeDates.value=null
}

const onClose = () => {
    printDialog.value = false
}
const boardDialog = ref(false)
watch(date, (date) => {
    const year = date.getFullYear() - 1911; // 轉換成民國年
    const month = date.getMonth() + 1;
    const day = date.getDate();
    date_roc.value = `${year}/${month}/${day}`
})

const supabase = useSupabaseClient()
const formattedAppointments = ref([])

async function fetchAppointments() {
    const { data, error } = await supabase
        .from('appointment_list')
        .select(`
        dr(dr_id, dr_name),
        users(users_id),
        appointment_list_visit_list,
        appointment_list_done
        `)

    if (error) {
        console.error('Error fetching appointments:', error)
        return
    }
        console.log(data)
    // 分析初診 & 複診
    const groupedData = {}

    data.forEach(appointment => {
        const doctorId = appointment.dr.dr_id
        if (!groupedData[doctorId]) {
        groupedData[doctorId] = {
            doctor_name: appointment.dr.dr_name,
            first_visit_count: 0,
            waiting_count: 0, 
            completed_count: 0,
            total_visits: 0
        }
        }

        // 判斷是否為初診
        const isFirstVisit = !data.some(a => a.users.users_id === appointment.users.users_id ) //&& a.visitList < appointment.visitList

        if (isFirstVisit) {
        groupedData[doctorId].first_visit_count++
        }
        
        if (appointment.appointment_list_done === '完診') {
        groupedData[doctorId].completed_count++
        } else if (appointment.appointment_list_done === '候診') {
        groupedData[doctorId].waiting_count++
        }

        groupedData[doctorId].total_visits++
    })

    formattedAppointments.value = Object.values(groupedData)
    }

    const trueNext = (r) => {
    searchDialog.value=false
    if(radioSearch.value==="dr"){
        router.push({
        path: `/menunext/appointment_next/${r}`,
        query: {
            filter: drInput.value,
            column: radioSearch.value,
        }
    });   
    } else if(radioSearch.value==="date"){
        router.push({
        path: `/menunext/appointment_next/${r}`,
        query: {
            filter: dateInput.value,
            column: radioSearch.value,
        }
    });   
    }else{
        router.push({
        path: `/menunext/appointment_next/${r}`,
        query: {
            column: radioSearch.value,
        }
    });   
    }
}



const cardDialog = ref(false)
    const records = ref([
    {
        編號: '0000027952',
        姓名: '蘇妍婷',
        日期: '113/03/04',
        電話: '0990245556',
        金額: 100,
        延款否: 'N'
    }
    ])

    const detail = ref({
    處方日期: '113/03/04',
    碼段: '3',
    診別: '01',
    病歷號: '0000027952',
    姓名: '蘇妍婷',
    包藥天數: '0',
    診斷代碼: '01'
    })

    const treatments = ref([
    { 項目: '【肘】膏 - 右', 數量: 1 },
    { 項目: '【肘】封 - 右', 數量: 1 },
    { 項目: '【肘】針', 數量: 1 },
    { 項目: '針破', 數量: 1 },
    { 項目: '神頂', 數量: 1 },
    { 項目: '傷真', 數量: 1 }
    ])

    const currentIndex = ref(0)

    const goFirst = () => currentIndex.value = 0
    const goLast = () => currentIndex.value = records.value.length - 1
    const goNext = () => {
    if (currentIndex.value < records.value.length - 1) currentIndex.value++
    }
    const goPrev = () => {
    if (currentIndex.value > 0) currentIndex.value--
    }

    const editRecord = () => {
    console.log('Edit record:', records.value[currentIndex.value])
    }
    const deleteRecord = () => {
    if (records.value.length > 0) {
        records.value.splice(currentIndex.value, 1)
        currentIndex.value = Math.max(0, currentIndex.value - 1)
    }
    }
    const selectPrescription = () => {
    alert('選擇處方功能尚未實作')
    }
    const saveRecord = () => {
    alert('紀錄已儲存')
    }
    const addRecord = () => {
    records.value.push({
        編號: '',
        姓名: '',
        日期: '',
        電話: '',
        金額: 0,
        延款否: ''
    })
    currentIndex.value = records.value.length - 1
    }
    const searchRecord = () => {
    alert('查詢功能尚未實作')
    }
    const printRecord = () => {
    window.print()
}

onMounted(()=>{
    date.value=new Date()
    selectTime.value='早上'
    fetchAppointments()
})
</script>

<template>
    <div class=" w-full">
        <div class="flex flex-row justify-end"> 
            <label class="text-xl">上機代號{{ userid }}</label>
        </div>
        <div class="grid grid-cols-4 grid-rows-3 gap-4 p-4 h-screen">
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="dateDialog=true ; selectTime=null">
                    <i class="material-icons !text-6xl">search</i>
                    <p>候診看板</p>
                </Button>
            </div>
        
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="searchDialog=true">
                    <i class="material-icons !text-6xl">search</i>
                    <p>醫師排班查詢</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="cardDialog=true">
                    <i class="material-icons !text-6xl">search</i>
                    <p>欠款登記簿</p>
                </Button>
            </div>        
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="showIdDialog = true">
                    <i class="material-icons !text-6xl">search</i>
                    <p>修改患者的病歷號碼</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="openPrintDialog">
                    <i class="material-icons !text-6xl">search</i>
                    <p>列印病患基本資料</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="showMessageDialog = true">
                    <i class="material-icons !text-6xl">search</i>
                    <p>現金收入日報表</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>列印掛號結帳單</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>修改下一病歷號碼</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>設定病患免收關係人</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>全部病患基本資料</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>IC卡讀卡機認證</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>安裝IC卡讀卡機</p>
                </Button>
            </div>

            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>每日上傳作業</p>
                </Button>
            </div>

            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>IC卡卡片更新作業</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150"  label="Submit" size="large" @click="router.push('/menunext/appointment')">
                    <i class="pi pi-sign-out !text-4xl"></i>
                    <p>回上一畫面</p>
                </Button>
            </div>
        </div>
        
        <Dialog v-model:visible="dateDialog">
            <template #header>
                <p>請輸入查詢日期</p>
            </template>
            <div class="flex flex-col justify-center items-center w-full">
                <DatePicker v-model="date" inline showWeek class="w-full sm:w-[30rem]"/>
                <div class="flex flex-row w-full" >
                    <ButtonGroup class="w-full">
                        <Button class="w-full" :class="selectTime !== '早上' ? '!bg-white !text-black' : '!bg-amber-500 !text-white'" variant="text" label="早上" @click="selectTime='早上'"/>

                        <Button class="w-full" :class="selectTime !== '下午' ? '!bg-white !text-black' : '!bg-amber-500 !text-white'" variant="text" label="下午" @click="selectTime='下午'"/>

                        <Button class="w-full" :class="selectTime !== '晚上' ? '!bg-white !text-black' : '!bg-amber-500 !text-white'" variant="text" label="晚上" @click="selectTime='晚上'"/>
                    </ButtonGroup>
                </div>   
            </div>

            <template #footer>
                
                <Button label="取消" @click="dateDialog=false"/>
                
                <Button label="確定" @click="boardDialog=true; dateDialog=false"/>
                
            </template>
        </Dialog>
        
        <Dialog v-model:visible="boardDialog" modal header="Edit Profile" :style="{ width: '25rem' }">
            <template #header>
                <p>{{date_roc}}{{ selectTime }}</p>
            </template>
            <div class="flex flex-col justify-center items-center w-full">

                <DataTable :value="formattedAppointments" class="w-full">
                    <Column field="doctor_name" header="診斷醫師"></Column>
                    <Column field="first_visit_count" header="初診"></Column>
                    <Column field="waiting_count" header="候診"></Column>
                    <Column field="completed_count" header="完診"></Column>
                    <Column field="total_visits" header="合計"></Column>
                </DataTable>

            </div>

            <template #footer>
                
                <Button label="退出" @click="boardDialog=false"/>
                
                <Button label="更換時段" @click="boardDialog=false; dateDialog=true"/>
                
            </template>
        </Dialog>
        
        <Dialog v-model:visible="searchDialog" modal header="醫師排班查詢">
            <div class="w-full">
                <div class="flex flex-row items-center w-full mb-3">
                    <RadioButton v-model="radioSearch" inputId="dr" name="group" value="dr" class="mr-2"/>
                    <label for="dr">依醫師查詢</label>
                </div>
                <div class="flex flex-row items-center w-full mb-3">
                    <RadioButton v-model="radioSearch" inputId="date" name="group" value="date" class="mr-2"/>
                    <label for="date">依日期查詢</label>
                </div>
                <div class="flex flex-row items-center w-full mb-3">
                    <RadioButton v-model="radioSearch" inputId="all" name="group" value="all" class="mr-2"/>
                    <label for="all">全院排班表</label>
                </div>
                <div class="flex flex-col w-full mb-3" v-if="radioSearch==='dr'">
                    <label>請輸入查詢醫師</label>
                    <InputText type="text" v-model="drInput" />
                </div>
                <div class="flex flex-col w-full mb-3" v-if="radioSearch==='date'">
                    <label>請輸入查詢日期</label>
                    <DatePicker v-model="dateInput" />
                </div>
            </div>   
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="searchDialog = false"></Button>
                <Button type="button" label="Save" @click="trueNext('a9_2')"></Button>
            </div>
        </Dialog>
        
        
        <Dialog v-model:visible="cardDialog" modal header="欠款登記簿">
    <div class="flex flex-col space-y-2">
        <!-- 表格區 -->
        <DataTable :value="records" class="text-sm" scrollable scrollHeight="150px">
            <Column field="編號" header="病患編號" />
            <Column field="姓名" header="病患姓名" />
            <Column field="日期" header="缺數日期" />
            <Column field="電話" header="電話" />
            <Column field="金額" header="缺數金額" />
            <Column field="延款否" header="延款否(延款碼段)" />
        </DataTable>

        <!-- 詳細資訊 -->
        <div class="grid grid-cols-3 gap-2 text-xs bg-gray-50 p-2 border rounded">
            <div>處方日期：{{ detail.處方日期 }}</div>
            <div>處方碼段：{{ detail.碼段 }}</div>
            <div>診別：{{ detail.診別 }}</div>
            <div>病歷編號：{{ detail.病歷號 }}</div>
            <div>病患姓名：{{ detail.姓名 }}</div>
            <div>包藥天數：{{ detail.包藥天數 }}</div>
            <div>診斷代碼：{{ detail.診斷代碼 }}</div>
        </div>

        <!-- 診療項目 -->
        <div class="mt-2">
            <DataTable :value="treatments" class="text-sm" scrollable scrollHeight="100px">
            <Column field="項目" header="醫令名稱" />
            <Column field="數量" header="數量" />
            </DataTable>
        </div>

        <!-- 按鈕列 -->
        <div class="flex justify-between mt-4 flex-wrap gap-2">
            <Button label="首筆" icon="pi pi-angle-double-left" outlined @click="goFirst" />
            <Button label="上筆" icon="pi pi-angle-left" outlined @click="goPrev" />
            <Button label="下筆" icon="pi pi-angle-right" outlined @click="goNext" />
            <Button label="尾筆" icon="pi pi-angle-double-right" outlined @click="goLast" />
            <Button label="修改" icon="pi pi-pencil" outlined @click="editRecord" />
            <Button label="刪除" icon="pi pi-trash" outlined @click="deleteRecord" />
            <Button label="選擇處方" icon="pi pi-search" outlined @click="selectPrescription" />
            <Button label="存檔" icon="pi pi-save" @click="saveRecord" />
            <Button label="新增" icon="pi pi-plus" @click="addRecord" />
            <Button label="查詢" icon="pi pi-search" outlined @click="searchRecord" />
            <Button label="列印" icon="pi pi-print" outlined @click="printRecord" />
            <Button label="離開" icon="pi pi-sign-out" outlined @click="cardDialog = false" />
        </div>
        </div>
    </Dialog>
        <Dialog
            v-model:visible="showMessageDialog"
            modal
            header="訊息通知"
            :closable="false"
            :style="{ width: '25rem' }"
            >
            <div class="flex flex-col items-center text-center">
                <p class="text-xl text-gray-800 leading-relaxed">
                本功能為醫院級採用<br />
                批價處結帳專用報表
                </p>
                <Button
                label="確定"
                icon="pi pi-check"
                class="mt-4 px-6 py-2 text-lg"
                @click="showMessageDialog = false"
                />
            </div>
        </Dialog>
        <Dialog
            v-model:visible="showIdDialog"
            modal
            header="修改病歷號碼"
            :closable="false"
            >
            <div class="flex flex-col justify-center">
                <Form v-slot="$idForm" :resolver="idResolver" @submit="idSubmit" class="flex flex-col justify-center items-center">
                    <div class="flex flex-col items-center w-full justify-start">
                        <div class="flex flex-row items-center w-full justify-start">
                            <p>請輸入患者姓名：</p>
                            <InputText type="text" name="usersName" v-model="idForm.usersName" @blur="fetchMedicalHistoryNumber" />
                        </div>
                        <Message
                            v-if="$idForm.usersName?.invalid"
                            severity="error"
                            size="small"
                            variant="simple"
                            class="mb-4"
                            >{{ $idForm.usersName.error?.message }}</Message
                        >
                    </div>
                    <div class="flex flex-row w-full items-center justify-start mb-5">
                        <p>原來的病歷號碼：</p>
                        <p>{{ idForm.usersData }}</p>
                    </div>
                    
                    <div class="flex flex-col items-center w-full">
                        <div class="flex flex-row items-center w-full justify-start">
                            <p>新的病歷號碼：</p>
                            <InputText type="text" name="newMedicalHistoryNumber" v-model="idForm.newMedicalHistoryNumber"/>
                        </div>
                        <Message
                            v-if="$idForm.newMedicalHistoryNumber?.invalid"
                            severity="error"
                            size="small"
                            variant="simple"
                            class="mb-4"
                            >{{ $idForm.newMedicalHistoryNumber.error?.message }}</Message
                        >   
                    </div>
                    <div class="flex flex-row w-full items-center justify-end gap-2">
                    
                        <Button class="transition-transform duration-300 !border-none hover:scale-150 !bg-red-500" label="取消" @click="showIdDialog = false;idForm.usersName = null;idForm.newMedicalHistoryNumber" />
                        
                        <Button class="transition-transform duration-300 !border-none hover:scale-150 !bg-sky-400" label="確定" type="submit"/>
                        
                    </div>
                </Form>
            </div>
        </Dialog>

        <Dialog v-model:visible="printDialog">
            <div class="space-y-4">

                <!-- 條件輸入 -->
                <div class="grid grid-cols-2 gap-2">
                <div v-for="(label, i) in conditionOptions" :key="i" class="flex items-center gap-2">
                    <RadioButton v-model="condition" :inputId="'cond' + i" :value="label.value" />
                    <label :for="'cond' + i" class="text-sm">{{ label.label }}</label>
                </div>
                </div>

                <div class="w-full">
                    <div v-if="condition==='firstVisit' || condition==='recent'" class="w-full">
                        <p class="text-sm text-slate-500">MM/DD/YYYY~MM/DD/YYYY</p>
                        <DatePicker v-model="rangeDates" selectionMode="range" :manualInput="false" class="w-full"/>
                    </div>
                    <div v-if="condition==='idRange' " class="flex flex-rol w-full">
                        <InputText v-model="startNumber" class="w-full items-center"/>
                        <p class="text-lg items-center">~</p>
                        <InputText v-model="endNumber" class="w-full items-center"/>
                    </div>
                </div>

                <!-- 欄位排序 -->
                <div class="border-t pt-4 space-y-2">
                    

                    <div class="flex items-center gap-4 text-sm">
                        <RadioButton v-model="includeArea" inputId="noArea" :value="false" />
                        <label for="noArea">不含區號及地址列印</label>
                        <RadioButton v-model="includeArea" inputId="yesArea" :value="true" />
                        <label for="yesArea">含區號及地址列印</label>
                    </div>
                    </div>

                    <!-- 按鈕 -->
                    <div class="flex justify-end gap-2 pt-2">
                    <Button label="確定" icon="pi pi-check" @click="printDialogConfirm" />
                    <Button label="離開" icon="pi pi-times" class="p-button-secondary" @click="onClose" />
                </div>
                </div>
        </Dialog>
        <Dialog v-model:visible="printTableDialog">
            <div id="printTable">
                
                <DataTable :value="printDataTable" tableStyle="width: full">
                    <Column field="users_name" header="病患姓名"></Column>
                    <Column field="users_medical_history_number" header="病患編號"></Column>
                    <Column field="users_birthday" header="病患生日"></Column>
                    <Column field="users_phone" header="病患電話"></Column>
                </DataTable>
                
            </div>
            <template #footer>
                <div class="flex flex-row justify-center w-full">
                    <Button label="列印" @click="printData"/>
                </div>
            </template>
        </Dialog>
    </div>
</template>