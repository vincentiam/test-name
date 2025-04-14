<script setup>
const visible = defineModel('visible')
const printDataTable = defineModel('printDataTable')
</script>
<template>
    <Dialog v-model:visible="visible" @hide="printDataTable=null">
        <div id="printTable">
            
            <DataTable :value="printDataTable" tableStyle="width: full">
                <Column field="users_name" header="病患姓名"></Column>
                <Column field="users_medical_history_number" header="病患編號"></Column>
                <Column field="users_birthday" header="病患生日"></Column>
                <Column field="users_phone" header="病患電話"></Column>
                <Column field="users_address" header="病患地址"></Column>
                <Column field="users_remark" header="備註"></Column>
            </DataTable>
            
        </div>
        <template #footer>
            <div class="flex flex-row justify-center w-full">
                <Button label="列印" @click="printData"/>
            </div>
        </template>
    </Dialog>
</template>