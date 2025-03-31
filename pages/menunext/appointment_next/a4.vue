<script setup >
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const supabase = useSupabaseClient();
const name = ref(null)
const birthday = ref(null)
const id = ref(null)
const phone = ref(null)
const telephone = ref(null)
const address = ref(null)
const remark = ref(null)
const date = ref(new Date())
const telephoneSelected = ref('7')
const submit = async() => {
    birthday.value = formatDate(birthday.value)
    date.value = formatDate(date.value)
    const { error } = await supabase.from('users').insert([
        { 'users_id': id.value, 'users_name': name.value, 'users_birthday': birthday.value, 'users_phone': phone.value,  'users_address': address.value,  'users_remark': remark.value,  'users_telephone': telephone.value,  'users_start_date': date.value,  'users_last_date': date.value}
    ])
    if (error) {
        console.log(error)
        toast.add({
            severity: 'error',
            summary: '登入錯誤',
            life: 1500
        })
    } else {
        name.value = null
        birthday.value = null
        id.value = null
        phone.value = null
        telephone.value = null
        address.value = null
        remark.value = null
        date.value = new Date()
        telephoneSelected.value = '7'
        toast.add({
            severity: 'success',
            summary: '登入成功',
            life: 1500
        })
    }
    
}

const formatDate = (d) => {
    console.log(d)
    const date_temp = new Date(d);
    const year = date_temp.getFullYear();
    const month = String(date_temp.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
    const day = String(date_temp.getDate()).padStart(2, '0');

    const formatted = `${year}-${month}-${day}`;
    return formatted
}
</script>

<template>

    <div class="flex flex-col justify-center items-center bg-[url(~/assets/images/picture.jpg)] bg-cover">
        <div class="flex flex-col justify-center items-center h-screen w-[20vw]">
            <InputText class="w-full" type="text" v-model="name" placeholder="姓名"/>
            <DatePicker class="w-full" v-model="birthday" placeholder="出生年月日"/> 
            <InputText class="w-full" type="text" v-model="id" placeholder="身分證字號" maxlength="10"/>
            <InputMask class="w-full" type="text" v-model="phone" placeholder="手機號碼" mask="9999-999-999"/>
            <div class="flex flex-row gap-3 w-full">
                <RadioButton v-model="telephoneSelected" inputId="rb1" value="7" />
                <label for="rb1">7</label>
                <RadioButton v-model="telephoneSelected" inputId="rb2" value="8" />
                <label for="rb2">8</label>
            </div>
            <InputMask v-if="telephoneSelected==='7'" class="w-full" type="text" v-model="telephone" placeholder="市話號碼" mask="(99)999-9999"/>
            <InputMask v-else class="w-full" type="text" v-model="telephone" placeholder="市話號碼" mask="(99)9999-9999"/>
            <InputText class="w-full" type="text" v-model="address" placeholder="地址"/>
            <InputText class="w-full" type="text" v-model="remark" placeholder="備註"/>
            <DatePicker class="w-full" v-model="date" placeholder="初診日期" />
            
            <div class="flex flex-row justify-between w-full px-50vh"> 
            <NuxtLink to="/menunext/appointment">
                <Button class="transition-transform duration-300 hover:scale-200" label="取消" />
            </NuxtLink>               
            <Button class="transition-transform duration-300 hover:scale-200 !bg-sky-400" label="確定" @click="submit()"/>
            </div>
        </div>
    </div>
</template>