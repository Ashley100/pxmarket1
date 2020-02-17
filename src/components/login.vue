<template>
    <div class="main-login">
        <div class="container">
            <div class="login-block">
                <h2 class="title is-2">Вход</h2>
                <!--  -->
                <div class="field">
                    <label class="label">Введите ваш электронный адрес:</label>
                    <div class="control">
                        <input v-model="email"      id="email"  class="input"   type="email"      placeholder="Email">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Введите пароль:</label>
                    <div class="control">
                        <input v-model="password"   id="pass"   class="input"   type="password"   placeholder="Password">
                    </div>
                </div>
                <ul>
                    <li v-for="(error, index) in errors" :key="index">{{error}}</li>
                </ul>
                <div class="buttons has-addons is-centered">
                    <span class="button is-info is-selected" @click="onSubmit">вход</span>
                    <!-- <span class="button">Вход</span> -->
                    <router-link exact to="/registration" tag="span" class="button">регистрация</router-link> 
                </div>

            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errors: []
        }
    },
    methods: {
        onSubmit: function (e) {
            this.errors = []
            
            if (!this.email) {
                this.errors.push('Требуется указать email почту.');
            } 
            if (!this.password) {
                this.errors.push('Требуется указать пароль.');
            }
            const user = {
                email: this.email,
                password: this.password
            }
            if(this.errors.length == 0){

                this.$store.dispatch('loginUser', user)
                    .then(() => {
                        // this.$router.push('/market')
                    })
                    .catch(() => {})
            } else {
                throw this.errors
            }
            e.preventDefault()
       }
    },
    computed: {
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>


<style scoped>
.px-in-column {
    display: flex;
    flex-direction: column;
}
.main-login .container { display: flex; justify-content: center; }
.main-login .container .row { text-align: left; }
.login-block {
    width: 400px;
    margin-top: 10%;
    /* text-align: center; */
}

</style>

