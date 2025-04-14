<script setup>
    //候診看板
    const visible = defineModel('visible')
    const date_roc = defineModel('date_roc')
    const selectTime = defineModel('selectTime')
    const formattedAppointments = defineModel('formattedAppointments')
    const dateDialog = defineModel('dateDialog')
</script>

<template>
    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
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
            
            <Button label="退出" @click="visible=false"/>
            
            <Button label="更換時段" @click="visible=false; dateDialog=true"/>
            
        </template>
    </Dialog>
</template>