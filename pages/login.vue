<template>
  <div class="loginForm">
    <h1 class="title">Sign In</h1>
    <form class="form" @submit="onSubmit">
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">User name:</label>
        <div class="col-sm-10">
          <input
              type="text"
              class="form-control"
              v-model="userName"
              :class="{ invalid: userNameError }">
        </div>
        <span v-if="userNameError" class="error alert alert-danger">{{ userNameError }}</span>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Password:</label>
        <div class="col-sm-10">
          <input
              type="password"
              class="form-control"
              v-model="password"
              :class="{ invalid: passwordError }">
        </div>
        <span v-if="passwordError" class="error alert alert-danger">{{ passwordError }}</span>
      </div>
      <button type="submit" class="btnSend">Send</button>
    </form>
  </div>
</template>

<script setup type="ts">
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';

const {handleSubmit} = useForm({
  validationSchema: {
    userName: yup.string().required().min(4),
    password: yup.string().required().min(6),
  },
});

const onSubmit = handleSubmit(values => {
  const {pending, data} = useFetch('http://a7gsoft.for.uz/riverside/backend/web/api/login', {
    key: "server",
    method: "POST",
    body: {
      "login": values.userName.value,
      "password": values.password.value
    },
  }).then(t => console.log(values))
})

const {value: userName, errorMessage: userNameError} = useField('userName');
const {value: password, errorMessage: passwordError} = useField('password');

</script>

<style scoped>
.loginForm {
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 60px 0;
  text-transform: uppercase;
}

.form {
  width: 100%;
  padding: 100px 0;
}

.error {
  margin: 30px 0;
}

.form-control:focus {
  background-color: #fff;
  border-color: #7d7d7d !important;
  box-shadow: none !important;
  color: #212529;
}

.invalid {
  border-color: red;
}

.btnSend {
  float: right !important;
  padding: 10px 100px;
  background: #f1da63;
  border: none;
  outline: none;
  text-align: center;
}
</style>