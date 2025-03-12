<script setup>
const dataset = defineModel()
console.log(dataset)
</script>
<template>
   <DataTable :value="dataset" tableStyle="min-width: 50rem">
      <div v-if="dataset.some(item => 'userName' in item)">
         <Column field="userName" header="姓名"/>
      </div>
      <div v-if="dataset.some(item => 'medicalHistoryNumber' in item)">
         <Column field="medicalHistoryNumber" header="病歷號碼"/>
      </div>
      <div v-if="dataset.some(item => 'userId' in item)">
         <Column field="userId" header="身分證字號"/>
      </div>
      <div v-if="dataset.some(item => 'userBirthday' in item)">
         <Column field="userBirthday" header="生日"/>
      </div>
      <div v-if="dataset.some(item => 'userPhone' in item)">
         <Column field="userPhone" header="電話號碼"/>
      </div>
      <div v-if="dataset.some(item => 'userAddress' in item)">
         <Column field="userAddress" header="地址"/>
      </div>
      <div v-if="dataset.some(item => 'remark' in item)">
         <Column field="remark" header="備註"/>
      </div>
      <div v-if="dataset.some(item => 'startDate' in item)">
         <Column field="startDate" header="初診日期"/>
      </div>
      <div v-if="dataset.some(item => 'lastDate' in item)">
         <Column field="lastDate" header="最近日期"/>
      </div>
   </DataTable>
</template>