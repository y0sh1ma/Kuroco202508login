<template>
  <form @submit.prevent="login">
    <p v-if="loginStatus !== null" :style="{ color: resultMessageColor }">
      {{ resultMessage }}
    </p>

    <input v-model="email" name="email" type="email" placeholder="email" />
    <input
      v-model="password"
      name="password"
      type="password"
      placeholder="password"
    />
    <button type="submit">Login</button>
	
  </form>
</template>

<script setup>
import { useStore } from "~/stores/authentication";
import { storeToRefs } from 'pinia'


const store = useStore();
const router = useRouter()
const config = useRuntimeConfig();

const { authenticated } = storeToRefs(store)

const email = ref("");
const password = ref("");
const loginStatus = ref(null);
const resultMessage = ref(null);

let resultMessageColor = computed(() => {
  switch (loginStatus.value) {
    case "success":
      return "green";
    case "failure":
      return "red";
    default:
      return "";
  }
});

async function login() {
  const shouldSuccess = true
  
  const request = new Promise((resolve, reject) =>
      setTimeout(
          () => (shouldSuccess ? resolve() : reject(Error('login failure'))),
          1000
      )
  )

  try {
      await request
      const payload = {
          email: email.value,
          password: password.value
      }
      await store.login(payload)
	  
      loginStatus.value = 'success'
      resultMessage.value = 'Login successful'


	  router.push("/formsamplelist");
  } catch (e) {
	  loginStatus.value = 'failure'
      resultMessage.value = 'Login failed'
  }
}
</script>