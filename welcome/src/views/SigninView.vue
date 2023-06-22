<template>
    <div class="signin-page">
        <div class="text polka-dot-bg">
            <h1>SignIn</h1>
            <div class="separator" />
            <form id="signin">
                <input v-model="username" type="text" placeholder="Username">
                <input v-model="password" type="password" placeholder="Password">
                <button @click.prevent="submit">Submit!</button>
            </form>
        </div>
    </div>
</template>

<script>
import { goToMusicMicroFrontend } from '../bootstrap';

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        submit() {
          fetch('https://buildingmfe.maxgallo.io/api/login', {
            method: 'post',
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            })
          }).then(res => res.json())
          .then(data => {
            const token = data && data.data && data.data.token;
            console.log('TOKEN', token);
            goToMusicMicroFrontend();
          })
          .catch(error => {
            console.error(error);
          })
        }
    },
}
</script>

<style>
.signin-page {
    background-image: url('./vinyl2-bg.jpg');
    background-size: cover;
    height: 100%;
    width: 100%;
    color: var(--mint-cream);
    font-family: sans-serif;
}
button {
    display: block;
    margin-top: 5px;
}

input {
    margin: 5px 0px;
}
</style>
