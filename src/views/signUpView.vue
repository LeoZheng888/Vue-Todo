<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
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
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="SingUpItem.email"
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            v-model="SingUpItem.nickname"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
            v-model="SingUpItem.password"
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請再次輸入密碼"
            required
            v-model="confirmPassword"
          />
          <p v-if="checkSum" style="color: red">密碼不一致</p>
          <input class="formControls_btnSubmit" type="button" @click="signUp" value="註冊帳號" />
          <a class="formControls_btnLink" href="#/">登入</a>
          {{ SingUpItem }}
          {{ confirmPassword }}
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
const api = 'https://todolist-api.hexschool.io'
const confirmPassword = ref('')

const SingUpItem = ref({
  email: '',
  password: '',
  nickname: ''
})
const signUp = async () => {
  //  console.log(`${api}/users/sign_up`)
  try {
    const res = await axios.post(`${api}/users/sign_up`, SingUpItem.value)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
const checkSum = computed(() => {
  return confirmPassword.value !== '' && SingUpItem.value.password !== confirmPassword.value
})
</script>

<style></style>
