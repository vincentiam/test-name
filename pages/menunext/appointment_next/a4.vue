
<template>

    <div class="flex flex-col justify-center items-center bg-[url(~/assets/images/picture.jpg)] bg-cover">
        <div class="flex flex-col justify-center items-center h-screen w-[20vw]">
            <InputText class="w-full" type="password" v-model="password" placeholder="姓名"/>
            <InputText class="w-full" type="password" v-model="password" placeholder="生日"/>
            <InputText class="w-full" type="password" v-model="password" placeholder="身分證字號"/>
            <InputText class="w-full" type="password" v-model="password" placeholder="電話"/>
            <InputText class="w-full" type="password" v-model="password" placeholder="地址"/>
            
            <div class="flex flex-row justify-between w-full px-50vh"> 
            <NuxtLink to="/menunext/appointment">
                <Button class="transition-transform duration-300 hover:scale-200" label="取消" />
            </NuxtLink>
                
            <Button class="transition-transform duration-300 hover:scale-200 !bg-sky-400" label="確定" />
            </div>
        </div>
    </div>
</template>