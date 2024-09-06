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
          <RouterLink to="/" class="formControls_btnLink">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2'
import router from '@/router'
const api = 'https://todolist-api.hexschool.io'
const confirmPassword = ref('')

const SingUpItem = ref({
  email: '',
  password: '',
  nickname: ''
})
const signUp = async () => {
  if (
    SingUpItem.value.email == '' ||
    SingUpItem.value.nickname == '' ||
    SingUpItem.value.password == '' ||
    confirmPassword.value == ''
  ) {
    alert(`填入的訊息不完整`)
  }
  try {
    const res = await axios.post(`${api}/users/sign_up`, SingUpItem.value)

    if (res.data.status == true) {
      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        confirmButtonText: '關閉',
        timer: 2000,
        willClose: () => {
          // 在彈窗關閉後跳轉
          router.push({ name: 'home' })
        }
      })
    }
  } catch (error) {
    alert(`發生錯誤: ${error.response.data.message}`)
  }
}
const checkSum = computed(() => {
  return confirmPassword.value !== '' && SingUpItem.value.password !== confirmPassword.value
})
</script>

<style></style>
