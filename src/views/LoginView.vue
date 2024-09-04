<!-- login_page -->
<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            v-model="signTemp.email"
            placeholder="請輸入 email"
            required
          />
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            v-model="signTemp.password"
            placeholder="請輸入密碼"
            required
          />
          <input class="formControls_btnSubmit" type="button" @click="signIn" value="登入" />

          <a class="formControls_btnLink" href="#signUpPage">註冊帳號</a>

          {{ signTemp }}
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useCounterStore } from '@/stores/counter'
import { useRouter } from 'vue-router'
const api = 'https://todolist-api.hexschool.io'
const signTemp = ref({
  email: '',
  password: ''
})
const signRes = ref('')
const userStore = useCounterStore()
const router = useRouter()

const signIn = async () => {
  /*  location.href = '#todoListPage' */
  try {
    const res = await axios.post(`${api}/users/sign_in`, signTemp.value)
    console.log('res:', res)

    signRes.value = res.data.token

    document.cookie = `someCookieName=${res.data.token};`
    //  console.log('名子:', res.data.nickname)
    /*  if (res.data.status === true) {
      console.log('123', userStore.setNickName)
      router.push('/todoListPage')
    } */
    if (res.data.nickname) {
      console.log('Calling setNickName with:', res.data.nickname)
      userStore.setNickName(res.data.nickname)
      console.log('Updated nickName in store:', userStore.nickName) // 確認 nickName 是否更新
      router.push('/todoListPage')
    }
  } catch (error) {
    alert(`發生錯誤: ${error.response.data.message}`)
  }
}
</script>
