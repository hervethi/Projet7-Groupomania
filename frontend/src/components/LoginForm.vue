<template>
  <div class="login_page">
    <h2>Veuillez vous connecter</h2>
    <form id="login" v-on:submit.prevent="logIn">
      <label for="nickname">E-Mail</label>
      <input
        @input="isEmailValid(this.email, 'email')"
        class="input_form"
        id="email"
        type="text"
        v-model="email"
      />
      <div class="password_box">
        <label for="password">Mot de passe</label>
        <input
          @input="isPasswordValid(this.password, 'password')"
          class="input_form"
          id="password"
          type="password"
          v-model="password"
        />
        <div id="show_password" @click="toggleShowPassword">
          <i class="fas fa-eye-slash" v-if="!password_showed"></i>
          <i class="fas fa-eye" v-if="password_showed"></i>
        </div>
      </div>
      <div class="submit_form">
        <transition name="fadeButton">
          <UserButton
            v-if="!confirmLogin"
            buttonClass="formButton"
            buttonText="Se Connecter"
            disabled
          />
        </transition>
        <div class="login_result">
          <transition name="successAppear">
            <span class="logged" v-if="confirmLogin">Connecté</span>
          </transition>
          <transition name="errorAppear">
            <span class="errorLog" v-if="showErrorLogin">{{ errorLogin }}</span>
          </transition>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import UserButton from "./UserButton.vue";
import { isEmailValid } from "../functions/formCheck.js";
import { isPasswordValid } from "../functions/formCheck.js";
import { sendLoginForm } from "../functions/fetchUser.js";
import { userLogged } from "../functions/fetchUser.js";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      confirmLogin: "",
      showErrorLogin: "",
      errorLogin: "",
      password_showed: false,
    };
  },
  components: {
    UserButton,
  },
  methods: {
    isEmailValid,
    isPasswordValid,
    sendLoginForm,
    userLogged,
    toggleShowPassword() {
      if (!this.password_showed) {
        this.password_showed = true;
        document.getElementById("password").setAttribute("type", "text");
      } else {
        this.password_showed = false;
        document.getElementById("password").setAttribute("type", "password");
      }
    },
    async logIn() {
      this.showErrorLogin = false;
      let reponse = await sendLoginForm(this.email, this.password);
      if (!reponse.error) {
        localStorage.clear();
        localStorage.setItem("userId", reponse.userId);
        localStorage.setItem("token", `BEARER ${reponse.token}`);
        localStorage.setItem("nickname", reponse.nickname);
        localStorage.setItem("avatar", reponse.avatar);
        localStorage.setItem("privilege", reponse.privilege);
        this.showErrorLogin = false;
        this.confirmLogin = true;
        setTimeout(() => {
          this.$store.dispatch("changeLogState"); // Indique au store que l'utilisateur est connecté
          this.$router.push(`/whatsnew/`);
        }, 2000);
      } else {
        this.showErrorLogin = true;
        this.errorLogin = reponse.error;
        return;
      }
      return reponse;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login_page {
  margin-top: 40px;
  margin-bottom: 90px;
}
.password_box {
  position: relative;
}
#show_password {
  font-size: 20px;
  position: absolute;
  right: 20px;
  width: 30px;
  bottom: 25px;
}

i {
  position: absolute;
}
h2 {
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
  width: 94%;
  margin: auto;

  &::after {
    background-color: lightgrey;
    content: "";
    display: block;
    height: 1px;
    margin-top: 2px;
    width: 100%;
  }
}

#login {
  width: 90%;
  margin: auto;
}

label {
  display: flex;
  margin-top: 20px;
  margin-bottom: 2px;
  font-weight: bold;
  font-size: 17px;
}

input {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 30px;
  padding-left: 5px;

  &:focus {
    background-color: lightblue;
  }
}
.submit_form {
  position: relative;
  width: 80%;
  margin: auto;
  height: 50px;
}
button {
  width: 50px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

.login_result {
  height: 30px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.logged {
  color: green;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 13px;
  font-weight: bold;
  font-size: 20px;
}

.errorLog {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #fd2d01;
  font-size: 20px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  left: 0;
  right: 0;
  bottom: -65px;
}

.successAppear-enter-active,
.successAppear-leave-active {
  transition: all 0.5s;
  transition-delay: 0.5s;
}
.successAppear-enter-from {
  opacity: 0;
}

.errorAppear-enter-active,
.errorAppear-leave-active {
  transition: all 0.5s;
}
.errorAppear-enter-from {
  opacity: 0;
}

.fadeButton-enter-active,
.fadeButton-leave-active {
  transition: all 0.5s;
}
.fadeButton-leave-to {
  opacity: 0;
}
</style>
