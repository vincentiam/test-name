<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const visible = defineModel('searchDialog')
    const radioSearch = defineModel('radioSearch')
    const drInput = defineModel('drInput')
    const dateInput = defineModel('dateInput')
    const trueNext = (r) => {
        visible.value=false
        if(radioSearch.value==="dr"){
            const temp = drInput.value.trim()
            drInput.value = temp
            console.log(drInput.value)
            router.push({
            path: `/menunext/appointment_next/${r}`,
            query: {
                filter: drInput.value,
                column: radioSearch.value,
            }
        });  
        } else if(radioSearch.value==="date"){
            router.push({
            path: `/menunext/appointment_next/${r}`,
            query: {
                filter: dateInput.value,
                column: radioSearch.value,
            }
        });   
        }else{
            router.push({
            path: `/menunext/appointment_next/${r}`,
            query: {
                column: radioSearch.value,
            }
        });   
        }
    }
</script>

<template>
    <Dialog v-model:visible="visible" modal header="醫師排班查詢">
        <div class="w-full">
            <div class="flex flex-row items-center w-full mb-3">
                <RadioButton v-model="radioSearch" inputId="dr" name="group" value="dr" class="mr-2"/>
                <label for="dr">依醫師查詢</label>
            </div>
            <div class="flex flex-row items-center w-full mb-3">
                <RadioButton v-model="radioSearch" inputId="date" name="group" value="date" class="mr-2"/>
                <label for="date">依日期查詢</label>
            </div>
            <div class="flex flex-row items-center w-full mb-3">
                <RadioButton v-model="radioSearch" inputId="all" name="group" value="all" class="mr-2"/>
                <label for="all">全院排班表</label>
            </div>
            <div class="flex flex-col w-full mb-3" v-if="radioSearch==='dr'">
                <label>請輸入查詢醫師</label>
                <InputText type="text" v-model="drInput" />
            </div>
            <div class="flex flex-col w-full mb-3" v-if="radioSearch==='date'">
                <label>請輸入查詢日期</label>
                <DatePicker v-model="dateInput" />
            </div>
        </div>   
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="trueNext('a9_2')"></Button>
        </div>
    </Dialog>
</template>