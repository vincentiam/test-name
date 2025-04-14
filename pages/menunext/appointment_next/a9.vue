<script setup>
import {ref,watch} from 'vue'
import { storeToRefs } from 'pinia'
import { userData } from '~/store/userstore.js'
import {useRouter} from 'vue-router'
import { useToast } from 'primevue/usetoast';
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Dialog } from 'primevue';
import TableData from '~/components/tableData.vue';
import DateDialog from '~/components/a9/waiting_board/dateDialog.vue'
import BoardDialog from '~/components/a9/waiting_board/boardDialog.vue'
import SchedulSearchDialog from '~/components/a9/schedul_dearch_dialog.vue'
import CardDialog from '~/components/a9/card_dialog.vue'
import PrintPatientDialog from '~/components/a9/print_patient_dialog.vue'
import PrintDataTable from '~/components/a9/print_data_table.vue'
import PrintRegisteredDialog from '~/components/a9/print_registered_dialog.vue'
import ForFreeDialog from '~/components/a9/for_free_dialog.vue'

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

const ICDialogShow = ref(false)
const ICAuthDialogShow = ref(false)

// 安裝 IC 讀卡機
const downloadIC = () => {
    ICDialogShow.value = true
    setTimeout(() => {
        ICDialogShow.value = false
        toast.add({
        severity: 'success',
        summary: '安裝成功',
        life: 3000
        })
    }, 3000)
    }

    // 認證 IC 讀卡機
    const authIC = () => {
    ICAuthDialogShow.value = true
    setTimeout(() => {
        ICAuthDialogShow.value = false
        toast.add({
        severity: 'success',
        summary: '認證成功',
        life: 3000
        })
    }, 3000)
}
const uploadDialogShow = ref(false)
const updateCardDialogShow = ref(false)

const uploadDailyJob = () => {
    uploadDialogShow.value = true
    setTimeout(() => {
    uploadDialogShow.value = false
    toast.add({
        severity: 'success',
        summary: '上傳成功',
        life: 3000
    })
    }, 3000)
}

const updateICCardJob = () => {
    updateCardDialogShow.value = true
    setTimeout(() => {
    updateCardDialogShow.value = false
    toast.add({
        severity: 'success',
        summary: '更新成功',
        life: 3000
    })
    }, 3000)
}

// 列印病患資料
const printDialog = ref(false)
const printTableDialog = ref(false)
const printDataTable = ref(null)

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

//掛號結帳單
const orderDialog = ref(false)

const openOrderDialog = () => {
    orderDialog.value = true
    orderForm.value = {
        checkoutDate: null,
        checkoutPeriod: '',
        staff: '',
        printItems: [],
        feePrintMode: 'together',
        patientPrintMode: 'prescriptionNumber',
        groupByPerson: false
    }
}

// Checkbox 項目
const orderPrintOptions = [
    { label: '結帳明細表', value: 'summary' },
    { label: '退費明細表', value: 'refundDetail' },
    { label: '還款明細表', value: 'refund' },
    { label: '醫師看診人次表', value: 'doctor' },
    { label: '結帳總表', value: 'total' },
]

// RadioButton 項目
const orderPrintModes = [
    { label: '健保與自費一起印', value: 'together' },
    { label: '健保與自費分開印', value: 'separate' },
]

const elsePrintOptions = [
    { label: '明細表印出掛號身分', value: 'identity' },
    { label: '健保明細不印', value: 'noPrint' },
]

const pantientPrintModes = [
    { label: '依處方編號排序', value: 'prescriptionNumber' },
    { label: '依病歷號排序', value: 'medicalNumber' },
    { label: '同一人排在一起', value: 'people' },
    { label: '診號', value: 'clinicNumber' },
]


// 提交處理
const orderSubmit = async() => {
    orderDialog.value = false
    console.log('送出表單資料:', orderForm.value)
    const { data, error } = await supabase.from('users').select('*')
    openOrderDialog()
}   

// 顯示病患基本資料
const patientsDialogShow = ref(false)
const dataset = ref(null)
const patientsInformation = async() => {
    const { data, error } = await supabase.from('users').select('*')
    if(error){
        console.log(error.message)
    }
    dataset.value = data
    patientsDialogShow.value = true
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
const cardDialog = ref(false)

//病患免收關係人
const freeDialog = ref(false)

onMounted(()=>{
    date.value=new Date()
    selectTime.value='早上'
})

watch(printDataTable,(r) => {
    console.log(r)
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
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="printDialog = true">
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
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="openOrderDialog">
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
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="freeDialog = true">
                    <i class="material-icons !text-6xl">search</i>
                    <p>設定病患免收關係人</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="patientsInformation()">
                    <i class="material-icons !text-6xl">search</i>
                    <p>全部病患基本資料</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="authIC">
                    <i class="material-icons !text-6xl">search</i>
                    <p>IC卡讀卡機認證</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="downloadIC">
                    <i class="material-icons !text-6xl">search</i>
                    <p>安裝IC卡讀卡機</p>
                </Button>
            </div>

            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="uploadDailyJob">
                    <i class="material-icons !text-6xl">search</i>
                    <p>每日上傳作業</p>
                </Button>
            </div>

            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="updateICCardJob">
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
        <DateDialog v-model:visible="dateDialog" v-model:date="date" v-model:selectTime="selectTime" v-model:boardDialog="boardDialog"/>
        <BoardDialog v-model:visible="boardDialog" v-model:date_roc="date_roc" v-model:selectTime="selectTime" v-model:formattedAppointments="formattedAppointments" v-model:dateDialog="dateDialog"/>
        <SchedulSearchDialog v-model:visible="searchDialog" v-model:radioSearch="radioSearch" v-model:drInput="drInput" v-model:dateInput="dateInput"/>
        <CardDialog v-model:visible="cardDialog" title="病患基本資料" />
        
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

        <PrintPatientDialog v-model:visible="printDialog" v-model:printTableDialog="printTableDialog" v-model:printDataTable="printDataTable"/>
        <PrintDataTable v-model:visible="printTableDialog" v-model:printDataTable="printDataTable"/>
        <PrintRegisteredDialog v-model:visible="orderDialog"/>
        
        
        <Dialog v-model:visible="patientsDialogShow" class="w-screen h-screen" header="全部病患資料">
                <TableData v-model="dataset"/>
        </Dialog>
        <Dialog v-model:visible="ICAuthDialogShow" header="讀卡機認證中">
            <div class="flex flex-col w-full items-center justify-center">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="認證中" />
                <p class="mt-4">IC讀卡機認證中，請稍候...</p>
            </div>
        </Dialog>
        <Dialog v-model:visible="ICDialogShow" header="讀卡機安裝中">
            <div class="flex flex-col w-full items-center justify-center">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                <p class="mt-4">IC讀卡機安裝中，請稍候...</p>
            </div>
        </Dialog>
        <Dialog v-model:visible="uploadDialogShow" header="每日上傳中">
            <div class="flex flex-col w-full items-center justify-center">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="每日上傳中" />
                <p class="mt-4">每日上傳作業進行中，請稍候...</p>
            </div>
        </Dialog>
        <Dialog v-model:visible="updateCardDialogShow" header="卡片更新中">
            <div class="flex flex-col w-full items-center justify-center">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="卡片更新中" />
                <p class="mt-4">IC卡片更新作業進行中，請稍候...</p>
            </div>
        </Dialog>
        <ForFreeDialog v-model:visible="freeDialog"/>
    </div>
</template>