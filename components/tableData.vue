<script setup>
const dataset = defineModel()
console.log(dataset)
</script>
<template>
   <DataTable :value="dataset" tableStyle="min-width: 50rem">
      <div v-if="dataset.some(item => 'name' in item)">
         <Column field="name" header="姓名"/>
      </div>
      <div v-if="dataset.some(item => 'medical_history_number' in item)">
         <Column field="medical_history_number" header="病歷號碼"/>
      </div>
      <div v-if="dataset.some(item => 'id' in item)">
         <Column field="id" header="身分證字號"/>
      </div>
      <div v-if="dataset.some(item => 'birthday' in item)">
         <Column field="birthday" header="生日"/>
      </div>
      <div v-if="dataset.some(item => 'phone' in item)">
         <Column field="phone" header="電話號碼"/>
      </div>
      <div v-if="dataset.some(item => 'address' in item)">
         <Column field="address" header="地址"/>
      </div>
      <div v-if="dataset.some(item => 'remark' in item)">
         <Column field="remark" header="備註"/>
      </div>
      <div v-if="dataset.some(item => 'start_date' in item)">
         <Column field="start_date" header="初診日期"/>
      </div>
      <div v-if="dataset.some(item => 'last_date' in item)">
         <Column field="last_date" header="最近日期"/>
      </div>
   </DataTable>
</template>