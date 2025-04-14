<script setup>
import { date } from 'zod';

const visible = defineModel('visible')
const form = ref({
    pantientNumber: '' ,
    name:'',
    rocBirthday: new Date(),
    adBirthday: new Date(),
    insurance: null 
})
const supabase = useSupabaseClient();
const searchUsersMedicalHistoryNumber = () => {

    const {data,error} = supabase.from('users').select('*').eq('users_medical_history_number',form.value.pantientNumber) 
}
</script>
<template>
    <Dialog class="w-[36%]" v-model:visible="visible">
        <Form v-slot="$form">
            <div class="flex flex-col gap-2">
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">病歷號碼</p>
                    <InputText class="col-span-2" type="text" v-model="form.pantientNumber" @blur="searchUsersMedicalHistoryNumber" />
                    <Button label="印條碼" class="col-span-1"/>
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">姓名</p>
                    <InputText class="col-span-3" type="text" v-model="form.name" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">出生日期</p>
                    <DatePicker v-model="form.rocBirthday" />
                    <p class="col-span-1">西元</p>
                    <DatePicker v-model="adBirthday" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">保別</p>
                    <Select v-model="selectedCity" :options="cities" optionLabel="name" class="col-span-2" />
                    <div class="flex flex-row items-center">
                        <Checkbox v-model="checked" binary />
                        <p>重大傷病身份</p>
                    </div>
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">身分證號</p>
                    <InputText class="col-span-3" type="text" v-model="form.name" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">電話號碼</p>
                    <InputText class="col-span-3" type="text" v-model="form.name" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">行動電話</p>
                    <InputText class="col-span-3" type="text" v-model="form.name" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">減免身分</p>
                    <Select v-model="selectedCity" :options="cities" optionLabel="name" class="col-span-2" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">郵地區號</p>
                    <InputText class="col-span-3" type="text" v-model="form.name" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">通訊地址</p>
                    <InputText class="col-span-3" type="text" v-model="form.name" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">投保機關</p>
                    <InputText class="col-span-3" type="text" v-model="form.name" />
                </div>
                <div class="grid grid-cols-4 w-full items-center justify-center gap-3">
                    <p class="col-span-1">備註</p>
                    <InputText class="col-span-3" type="text" v-model="form.name" />
                </div>
            </div>    
        </Form>

    </Dialog>
</template>