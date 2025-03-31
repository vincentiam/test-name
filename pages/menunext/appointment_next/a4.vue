<script setup >
import { ref, computed } from 'vue';
const name = ref(null)
const birthday = ref(null)
const id = ref(null)
const phone = ref(null)
const telephone = ref(null)
const address = ref(null)
const remark = ref(null)
const date = ref(new Date())

const submit = async() => {
    birthday.value = formatDate(birthday.value)
    date.value = formatDate(date.value)
    const { error } = await supabase.from('users').insert([
        { 'users_id': id.value, 'users_name': name.value, 'users_birthday': birthday.value, 'users_phone': phone.value,  'users_address': address.value,  'users_remark': remark.value,  'users_telephone': telephone.value,  'users_date': date.value}
    ])
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
            <InputMask class="w-full" type="text" v-model="telephone" placeholder="市話號碼" mask="(99)9999-9999"/>
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