<template>
  <div class="login-root">
    <div style="width: 100%; text-align: center">
      <bl-row just="center">
        <div class="input-wrapper" style="width: 235px; margin-right: 30px">
          <input
            type="text"
            class="form__input"
            placeholder="username"
            v-model="formRegister.username"
            @keyup.enter="register"/>
          <div class="iconbl bl-user-line"></div>
        </div>
        <div class="input-wrapper" style="width: 235px">
          <input type="password" class="form__input" placeholder="password" v-model="formRegister.password"
                 @keyup.enter="register"/>
          <div class="iconbl bl-a-Securitypermissions-line"></div>
        </div>
      </bl-row>
      <!--      <button class="custom-btn btn-logout" style="margin-right: 30px" @click="logout"><span>Logout</span></button>-->
      <button :class="['custom-btn btn-login', logingIn ? 'loging-in' : '']" @click="register"><span>register</span>
      </button>
      <bl-col height="80px" just="center">
      </bl-col>
    </div>
  </div>

</template>

<script setup lang="ts">
import router from '@renderer/router'
import {onMounted, ref} from 'vue'
import {useConfigStore} from '@renderer/stores/config'
import {useUserStore} from '@renderer/stores/user'
import {isBlank} from '@renderer/assets/utils/obj'
import Notify from "@renderer/scripts/notify";
import {userAddApi} from "@renderer/api/auth";

// const isDark = useDark()
const configStore = useConfigStore()
const userStore = useUserStore()


//#region --------------------------------------------------< 授权 >--------------------------------------------------
// 是否登录中
const logingIn = ref(false)

/**
 * 登录
 */
const register = async () => {
  console.log('register')
  // 未填写地址时, 不校验用户是否登录
  if (isBlank(formRegister.value.serverUrl)) {
    return
  }
  if (logingIn.value) {
    return
  }
  try {
    logingIn.value = true
    await userAddApi(formRegister.value).then((_resp) => {
      Notify.success('注册成功，请稍等')
    })
    await userStore.loginByPassword(formRegister.value.username, formRegister.value.password)
    if (userStore.isLogin && configStore.viewStyle.isLoginToHomePage) {
      router.push('/home')
    }
    logingIn.value = false
  } catch (e) {
    logingIn.value = false
  } finally {
    logingIn.value = false
  }
  return
}


const formRegister = ref({
  /** 兼容末尾带 / 或不带 / 的写法, 最终会去除末尾的 / */
  serverUrl: '',
  username: '',
  password: '',
  type: 1,
})

onMounted(() => {

  formRegister.value.serverUrl = `${window.location.protocol}//${window.location.host}`

})

//#endregion
</script>

<style scoped lang="scss">
.login-root {
  @include box(100%, 100%);
  @include flex(column, center, center);
  padding: 40px;

  .avatar-img {
    height: 150px;
    @include themeShadow(2px 4px 7px 2px rgba(134, 134, 134, 0.3), 2px 4px 7px 2px #000000);
    @include themeBorder(2px, #a8abb2, #707070);
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .input-wrapper {
    height: 100%;
    margin-bottom: 15px;
    position: relative;

    input {
      @include box(100%, 40px);
      @include font(16px, 200);
      color: var(--el-color-primary);
      border: none;
      border-radius: 10px;
      padding-left: 40px;
      background: none;
      transition: 0.3s;
      box-shadow: inset 0.2rem 0.2rem 0.5rem #c8d0e7,
      inset -0.2rem -0.2rem 0.5rem #ffffff;

      [class='dark'] & {
        box-shadow: inset 0.2rem 0.2rem 0.5rem #232323dd,
        inset -0.1rem -0.1rem 0.5rem #4e4e4e;
      }

      &::placeholder {
        @include themeColor(#9baacf, #606060);
      }

      &:focus {
        outline: none;
        box-shadow: 0.3rem 0.3rem 0.6rem #c8d0e7,
        -0.2rem -0.2rem 0.5rem #fff;

        [class='dark'] & {
          box-shadow: 0.3rem 0.3rem 0.6rem #000000,
          -0.1rem -0.1rem 0.5rem #4b4b4b;
        }

        ~ .iconbl {
          color: var(--el-color-primary);
        }
      }
    }

    .iconbl {
      @include themeColor(#9baacf, rgb(126, 126, 126));
      position: absolute;
      left: 10px;
      top: 8px;
      font-size: 25px;
      display: flex;
      transition: 0.3s ease;
    }

    .server-url-invalid {
      @include themeFilter(drop-shadow(0 0 3px rgb(197, 197, 197)), drop-shadow(0 0 3px #000000));
      position: absolute;
      bottom: 5px;
      right: 10px;
      cursor: pointer;
    }
  }

  .custom-btn {
    @include box(120px, 40px);
    @include font(14px 300);
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    background: transparent;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
    cursor: pointer;
    z-index: 1;
  }

  .btn-logout {
    @include themeColor(#9baacf, #7e7e7e);
    border: none;

    box-shadow: inset 2px 2px 2px 0px #ffffff80,
    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);

    [class='dark'] & {
      box-shadow: inset 2px 2px 2px 0px #59595980,
      7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    }

    &:after {
      @include box(0, 100%);
      @include absolute(0, '', '', 0);
      content: '';
      direction: rtl;
      z-index: -1;
      transition: all 0.3s ease;
      border-radius: 7px;
      box-shadow: -7px -7px 20px 0px #fff9,
      -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;

      [class='dark'] & {
        box-shadow: -7px -7px 20px 0px rgba(0, 0, 0, 0.2),
        -4px -4px 5px 0px rgba(0, 0, 0, 0.1),
        7px 7px 20px 0px #0002,
        4px 4px 5px 0px #0001;
      }
    }

    &:hover {
      color: var(--el-color-primary);
    }

    &:hover:after {
      left: auto;
      right: 0;
      width: 100%;
    }

    &:active {
      top: 2px;
    }
  }

  .btn-login {
    background: radial-gradient(circle, #ba8a10b1 0%, var(--el-color-primary) 70%, var(--el-color-primary) 100%);
    line-height: 42px;
    padding: 0;
    border: none;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transition: background 2s;

    &:before,
    &:after {
      content: '';
      @include absolute('', 0, 0, '');
      background: var(--el-color-primary);
      transition: all 0.3s ease;
    }

    &:before {
      @include box(2px, 0%);
    }

    &:after {
      @include box(0%, 2px);
    }

    &:hover {
      background: var(--el-color-primary-light-6);
      border-radius: 0;

      [class='dark'] & {
        box-shadow: none;
      }

      &:before {
        height: 100%;
      }

      &:after {
        width: 100%;
      }
    }

    span {
      @include box(100%, 100%);
      position: relative;
      display: block;

      &:hover {
        color: var(--el-color-primary);
      }

      &:before {
        @include box(2px, 0%);
      }

      &:hover:before {
        height: 100%;
      }

      &:after {
        @include box(0%, 2px);
      }

      &:hover:after {
        width: 100%;
      }

      &:before,
      &:after {
        content: '';
        @include absolute(0, '', '', 0);
        background: var(--el-color-primary);
        transition: all 0.3s ease;
      }
    }
  }

  .loging-in {
    cursor: no-drop !important;
  }

  .login-succ {
    color: #09a113;
  }

  .login-wait {
    color: #a18809;
  }

  .login-fail {
    color: #a11109;
  }

  .login-progress {
    width: 200px;

    :deep(.el-progress-bar__outer) {
      border-radius: 5px;
    }

    :deep(.el-progress-bar__inner) {
      @include themeShadow(inset 0 0 5px 0px rgb(226, 226, 226), inset 0 0 5px 2px #000);
      text-align: center;
      border-radius: 5px;
    }
  }

  .try-use {
    margin-top: 10px;
    color: var(--bl-text-color-light);
    font-weight: 300;
    font-style: italic;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
