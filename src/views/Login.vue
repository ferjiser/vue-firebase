<template>
    <form @submit.prevent="login">
        <div>
            Email: <input type="text" v-model="email">
        </div>
         <div>
            Password: <input type="password" v-model="password">
        </div>
        <button>Login</button>
    </form>
</template>

<script>
import firebase from 'firebase';

export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },
    beforeRouteEnter(to, from, next){
        const user = firebase.auth().currentUser;
        if(user){
            next({name: 'home'})
        }else{
            next();
        }
    },
    methods: {
        login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(()=> {
                this.$router.replace({name: 'home'});
            });
        }
    }
}
</script>

