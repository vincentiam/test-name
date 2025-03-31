<script setup>
const showSearchDialog = defineModel('showSearchDialog')
const title = defineModel('title')
const column = defineModel('column') 
const emit = defineEmits(['confirm']);

const dialogInput = defineModel('dialogInput')

const radioOption = ref('')
const radioOptionTwice = ref('')

const returnOption = () => {
    if (radioOption.value === "") {
        column.value = radioOptionTwice.value
    } else {
        column.value = radioOption.value
    }
}
</script>
<template>
    <Dialog v-model:visible="showSearchDialog" v-model:column="column" :header="title">
        <div class="flex flex-col">
            <div class="mb-6">
                <div>
                    <RadioButton v-model="radioOption" inputId="rb1" name="group" value=""/>
                    <label for="rb1">電腦自動比對條件</label>
                </div>
                <div v-if="radioOption===''">
                    <div class="ml-6">
                        <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="users_medical_history_number"/>
                        <label for="rb1">依病歷號碼查詢</label>
                    </div>
                    <div class="ml-6">
                        <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="users_name"/>
                        <label for="rb1">依姓名查詢</label>
                    </div>
                    <div class="ml-6">
                        <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="users_birthday"/>
                        <label for="rb1">依出生日期查詢</label>
                    </div>
                    <div class="ml-6">
                        <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="users_id"/>
                        <label for="rb1">依身份證號查詢</label>
                    </div>
                    <div class="ml-6">
                        <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="users_phone"/>
                        <label for="rb1">依電話號碼查詢</label>
                    </div>
                    <div class="ml-6">
                        <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="users_address"/>
                        <label for="rb1">依地址查詢</label>
                    </div>
                    <div class="ml-6">
                        <RadioButton v-model="radioOptionTwice" inputId="rb1" name="group" value="users_remark"/>
                        <label for="rb1">依備註查詢</label>
                    </div>
                </div>
                <div>
                    <RadioButton v-model="radioOption" inputId="rb2" name="group" value="users_start_date"/>
                    <label for="rb2">初診日期</label>
                </div>
                <div>
                    <RadioButton v-model="radioOption" inputId="rb3" name="group" value="users_last_date"/>
                    <label for="rb3">最近就診日期</label>
                </div>
            </div>
            <div class="flex flex-col">
                <label>請輸入任一條件:</label>
                <InputText type="text" v-model="dialogInput" />
            </div>
        </div>
        
        <template #footer>
            
            <Button label="取消" @click="showSearchDialog=false"/>
            
            <Button label="確定" @click="returnOption();emit('confirm');showSearchDialog=false"/>
            
        </template>
    </Dialog>
</template>