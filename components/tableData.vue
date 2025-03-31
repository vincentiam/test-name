<script setup>
const dataset = defineModel()
console.log(dataset)
</script>
<template>
   <DataTable :value="dataset" tableStyle="min-width: 50rem">
      <div v-if="dataset.some(item => 'users_name' in item)">
         <Column field="users_name" header="姓名"/>
      </div>
      <div v-if="dataset.some(item => 'users_medical_history_number' in item)">
         <Column field="users_medical_history_number" header="病歷號碼"/>
      </div>
      <div v-if="dataset.some(item => 'users_id' in item)">
         <Column field="users_id" header="身分證字號"/>
      </div>
      <div v-if="dataset.some(item => 'users_birthday' in item)">
         <Column field="users_birthday" header="生日"/>
      </div>
      <div v-if="dataset.some(item => 'users_phone' in item)">
         <Column field="users_phone" header="電話號碼"/>
      </div>
      <div v-if="dataset.some(item => 'users_address' in item)">
         <Column field="users_address" header="地址"/>
      </div>
      <div v-if="dataset.some(item => 'users_remark' in item)">
         <Column field="users_remark" header="備註"/>
      </div>
      <div v-if="dataset.some(item => 'users_start_date' in item)">
         <Column field="users_start_date" header="初診日期"/>
      </div>
      <div v-if="dataset.some(item => 'users_last_date' in item)">
         <Column field="users_last_date" header="最近日期"/>
      </div>
   </DataTable>
</template>