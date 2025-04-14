<script setup>
const visible = defineModel('visible')

const orderForm = ref({
    checkoutDate: null,
    checkoutPeriod: '',
    staff: '',
    printItems: [],
    feePrintMode: 'together',
    patientPrintMode: 'prescriptionNumber',
    groupByPerson: false
})

// Checkbox 項目
const orderPrintOptions = [
    { label: '結帳明細表', value: 'summary' },
    { label: '退費明細表', value: 'refundDetail' },
    { label: '還款明細表', value: 'refund' },
    { label: '醫師看診人次表', value: 'doctor' },
    { label: '結帳總表', value: 'total' },
]

// RadioButton 項目
const orderPrintModes = [
    { label: '健保與自費一起印', value: 'together' },
    { label: '健保與自費分開印', value: 'separate' },
]

const elsePrintOptions = [
    { label: '明細表印出掛號身分', value: 'identity' },
    { label: '健保明細不印', value: 'noPrint' },
]

const pantientPrintModes = [
    { label: '依處方編號排序', value: 'prescriptionNumber' },
    { label: '依病歷號排序', value: 'medicalNumber' },
    { label: '同一人排在一起', value: 'people' },
    { label: '診號', value: 'clinicNumber' },
]
</script>

<template>
    <!-- Dialog 區塊 -->
    <Dialog v-model:visible="visible" header="列印掛號結帳單" :modal="true" :style="{ width: '50vw' }">
        <div class="space-y-4">

        <!-- 結帳日期 -->
            <div class="flex items-center gap-3">
                <label for="checkoutDate" class="w-24 shrink-0">結帳日期</label>
                <Calendar id="checkoutDate" v-model="orderForm.checkoutDate" dateFormat="yy/mm/dd" class="w-full" />
            </div>

        <!-- 結帳時段 -->
            <div class="flex items-center gap-3">
                <label for="checkoutPeriod" class="w-24 shrink-0">結帳時段</label>
                <InputText id="checkoutPeriod" v-model="orderForm.checkoutPeriod" class="w-full" placeholder="例如：1,3" />
            </div>

        <!-- 掛號人員 -->
            <div class="flex items-center gap-3">
                <label for="staff" class="w-24 shrink-0">掛號人員</label>
                <InputText id="staff" v-model="orderForm.staff" class="w-full" placeholder="可輸入代號，空白為全部" />
            </div>

        <!-- 列印項目 Checkbox -->
            <div>
                <h3 class="font-semibold mb-2">列印項目</h3>
                <div class="grid grid-cols-2 gap-2">
                    <div v-for="item in orderPrintOptions" :key="item.value" class="flex items-center gap-2">
                    <Checkbox :inputId="item.value" :value="item.value" v-model="orderForm.printItems" />
                    <label :for="item.value">{{ item.label }}</label>
                    </div>
                </div>
            </div>

        <!-- 列印方式 RadioButton -->
            <div>
                <h3 class="font-semibold text-lg">列印方式</h3>
                <div class="flex flex-col">
                    <p class="text- text-gray-500">明細表</p>
                    <div class="flex flex-row items-center gap-3">
                        <div v-for="mode in orderPrintModes" :key="mode.value" class="flex items-center gap-2">
                            <RadioButton :inputId="mode.value" :value="mode.value" name="printMode" v-model="orderForm.feePrintMode" />
                            <label :for="mode.value">{{ mode.label }}</label>
                        </div>
                    </div>
                    <p class="text- text-gray-500">病患明細表</p>
                    <div class="flex flex-row items-center gap-3">
                        <div v-for="mode in pantientPrintModes" :key="mode.value" class="flex items-center gap-2">
                            <RadioButton :inputId="mode.value" :value="mode.value" name="patientPrintMode" v-model="orderForm.patientPrintMode" />
                            <label :for="mode.value">{{ mode.label }}</label>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-2">其他</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <div v-for="item in elsePrintOptions" :key="item.value" class="flex items-center gap-2">
                            <Checkbox :inputId="item.value" :value="item.value" v-model="orderForm.printItems" />
                            <label :for="item.value">{{ item.label }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 錯誤提示 -->
            <div class="text-red-500 font-semibold">
                僅可出非一般科資料、僅可出備科病人
            </div>

            <!-- 底部按鈕 -->
            <div class="flex justify-end gap-3 pt-4">
                <Button label="取消" icon="pi pi-times" severity="danger" @click="orderDialog = false" />
                <Button label="確定" icon="pi pi-check" @click="orderSubmit" />
            </div>
        </div>
    </Dialog>
</template>