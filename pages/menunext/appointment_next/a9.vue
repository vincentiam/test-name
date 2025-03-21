<script setup>
import {ref,watch} from 'vue'
import { storeToRefs } from 'pinia'
import { userData } from '~/store/userstore.js'
import {useRouter} from 'vue-router'
const router = useRouter()

const user = userData()
const { userid } = storeToRefs(user)
const dateDialog = ref(false)
const date = ref(null);
const date_roc = ref(null)


const selectTime = ref('早上')


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
        .from('appointmentList')
        .select(`
        staff(staffId, staffName),
        users(userId),
        visitList,
        done
        `)

    if (error) {
        console.error('Error fetching appointments:', error)
        return
    }
        console.log(data)
    // 分析初診 & 複診
    const groupedData = {}

    data.forEach(appointment => {
        const doctorId = appointment.staff.staffId
        if (!groupedData[doctorId]) {
        groupedData[doctorId] = {
            doctor_name: appointment.staff.staffName,
            first_visit_count: 0,
            waiting_count: 0, 
            completed_count: 0,
            total_visits: 0
        }
        }

        // 判斷是否為初診
        const isFirstVisit = !data.some(a => a.users.userId === appointment.users.userId ) //&& a.visitList < appointment.visitList

        if (isFirstVisit) {
        groupedData[doctorId].first_visit_count++
        }
        
        if (appointment.done === '完診') {
        groupedData[doctorId].completed_count++
        } else if (appointment.done === '候診') {
        groupedData[doctorId].waiting_count++
        }

        groupedData[doctorId].total_visits++
    })

    formattedAppointments.value = Object.values(groupedData)
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
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>醫師排班查詢</p>
                </Button>
            </div>
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>欠款登記簿</p>
                </Button>
            </div>        
            
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>修改患者的病歷號碼</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
                    <i class="material-icons !text-6xl">search</i>
                    <p>列印病患基本資料</p>
                </Button>
            </div>
    
            <div class="flex justify-center items-center h-full">        
                <Button class="transition-transform duration-300 !text-4xl hover:scale-150" label="Submit" size="large" @click="router.push('/menunext/appointment_next/a9')">
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
        
    </div>
</template>