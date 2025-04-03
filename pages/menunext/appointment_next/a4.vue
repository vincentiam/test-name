<script setup >
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod';
const toast = useToast();
const userSchema = z.object({
    name: z.string({ required_error: '姓名不可為空' }).min(1, '請輸入姓名'),
    birthday: z.date({ required_error: '請選擇出生日期' }),
    id: z.string({ required_error: '身分證不可為空' }).min(10, '身分證需為 10 碼').max(10),
    phone: z.string().optional(),
    telephone: z.string().optional(),
    address: z.string({ required_error: '地址不可為空' }).min(1, '請輸入地址'),
    remark: z.string().optional(),
    date: z.date({ required_error: '請選擇初診日期' })
}).refine(data => data.phone || data.telephone, {
    message: '手機號碼或市話至少填寫一個',
    path: ['phone'], // 你也可以改成 ['telephone']
})

const resolver = ref(zodResolver(userSchema));

const supabase = useSupabaseClient();

const form = ref({
    name: '',
    birthday: null,
    id: '',
    phone: '',
    telephone: '',
    address: '',
    remark: '',
    date: null,
})
const telephoneSelected = ref('7')
const submit = async() => {
    const result = userSchema.safeParse(form.value);
    console.log(result.error)
    if (!result.success) {
      toast.add({
        severity: 'error',
        summary: '登錄失敗',
        detail: '資料填寫錯誤',
        life: 1500
      });
    } else {
        let birthday_temp = formatDate(form.value.birthday)
        let date_temp = formatDate(form.value.date)
        const { error } = await supabase.from('users').insert([
            { 'users_id': form.value.id, 'users_name': form.value.name, 'users_birthday': birthday_temp, 'users_phone': form.value.phone,  'users_address': form.value.address,  'users_remark': form.value.remark,  'users_telephone': form.value.telephone,  'users_start_date': date_temp,  'users_last_date': date_temp}
        ])
        if (error) {
            console.log(error)
            toast.add({
                severity: 'error',
                summary: '登錄錯誤',
                life: 1500
            })
        } else {
            form.value.name = ''
            form.value.birthday = null
            form.value.id = ''
            form.value.phone = ''
            form.value.telephone = ''
            form.value.address = ''
            form.value.remark = ''
            form.value.date = null
            telephoneSelected.value = '7'
            toast.add({
                severity: 'success',
                summary: '登錄成功',
                life: 1500
            })
        }
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
        <Form v-slot="$form" :resolver="resolver" @submit="submit" class="flex flex-col justify-center items-center h-screen w-[20vw]">
            <InputText v-model="form.name" name="name" class="w-full" type="text" placeholder="姓名"/>
            <Message
                v-if="$form.name?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mb-4 w-full"
                >{{ $form.name.error?.message }}</Message
            >

            <DatePicker class="w-full" v-model="form.birthday" name="birthday" placeholder="出生年月日"/>
            <Message
                v-if="$form.birthday?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mb-4 w-full"
                >{{ $form.birthday.error?.message }}</Message
            >
            
            <InputText class="w-full" type="text" v-model="form.id" name="id" placeholder="身分證字號" maxlength="10"/>
            <Message
                v-if="$form.id?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mb-4 w-full"
                >{{ $form.id.error?.message }}</Message
            >
            
            <InputMask class="w-full" type="text" v-model="form.phone" name="phone" placeholder="手機號碼" mask="9999-999-999"/>
            <Message
                v-if="$form.phone?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mb-4 w-full"
                >{{ $form.phone.error?.message }}</Message
            >
            <div class="flex flex-row gap-3 w-full">
                <RadioButton v-model="telephoneSelected" inputId="rb1" value="7" />
                <label for="rb1">7</label>
                <RadioButton v-model="telephoneSelected" inputId="rb2" value="8" />
                <label for="rb2">8</label>
            </div>

            <InputMask v-if="telephoneSelected==='7'" v-model="form.telephone" name="telephone"  class="w-full" type="text" placeholder="市話號碼" mask="(99)999-9999"/>
            <InputMask v-else v-model="form.telephone" class="w-full" name="telephone" type="text" placeholder="市話號碼" mask="(99)9999-9999"/>
            <Message
                v-if="$form.telephone?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mb-4 w-full"
                >{{ $form.telephone.error?.message }}</Message
            >
            
            <InputText class="w-full" v-model="form.address" name="address" type="text" placeholder="地址"/>
            <Message
                v-if="$form.address?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mb-4 w-full"
                >{{ $form.address.error?.message }}</Message
            >
            
            <InputText class="w-full" v-model="form.remark" name="remark" type="text" placeholder="備註"/>
            <Message
                v-if="$form.remark?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mb-4 w-full"
                >{{ $form.remark.error?.message }}</Message
            >

            <DatePicker class="w-full" v-model="form.date" name="date" placeholder="初診日期" />
            <Message
                v-if="$form.date?.invalid"
                severity="error"
                size="small"
                variant="simple"
                class="mb-4 w-full"
                >{{ $form.date.error?.message }}</Message
            >
            <div class="flex flex-row justify-between w-full px-50vh"> 
                <NuxtLink to="/menunext/appointment">
                    <Button class="transition-transform duration-300 hover:scale-200" label="取消" />
                </NuxtLink>               
                <Button class="transition-transform duration-300 hover:scale-200 !bg-sky-400" label="確定" type="submit"/>
            </div>
        </Form>
    </div>
</template>