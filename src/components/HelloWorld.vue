<template>
  <div class="hello">
    <button @click="logout">Logout</button>
    <h1>{{ msg }}</h1>
    <form @submit.prevent="send">
      <input type="text" v-model="myMessage"/>
      <button>Send!</button>
    </form>
    <ul>
      <li v-for="message in messages" :key="message.id" @dblclick="remove(message)">
        {{message.text}}
        </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      db: null,
      messages: [],
      unsuscribe: null,
      myMessage: ''
    }
  },
  methods: {
    send(){
      this.db.collection('messages').add({
        text: this.myMessage,
        date: new Date()
      }).then(()=> {
        this.myMessage = '';
      })
    },
    remove(message){
      this.db.collection('messages').doc(message.id).delete();
    },
    logout(){
      firebase.auth().signOut()
      .then(()=> {
        this.$router.replace({name: 'login'});
      })
    }
  },
  created(){
    this.db = firebase.firestore();
    this.unsuscribe = this.db.collection('messages')
    .orderBy('date', 'desc')
    .limit(20)
    .onSnapshot(snapshot => {
      this.messages = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      })
    })
  },
  destroyed(){
    this.unsuscribe();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
