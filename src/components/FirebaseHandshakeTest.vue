<template>
  <div>
    <h1>Firebase Handshake Test</h1>
    <h2>Signed in to Firebase: {{uid}}</h2>
    <h2>Time until handshake: {{timeUntilHandshake}} <span v-if="timeUntilHandshake">ms</span></h2>
    <h2>foo: {{foo}}</h2>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'FirebaseHandshakeTest',

  data () {
    return {
      foo: '',
      timeUntilHandshake: '',
      uid: ''
    }
  },

  methods: {
    authenticate () {
      this.firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid
        } else {
          this.firebaseApp.auth().signInAnonymously().catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(`Firebase signin error: ${errorCode}: ${errorMessage}`)
          })
        }
      })

      this.getData()
    },

    getData () {
      this.db = this.firebaseApp.database()
      this.db.ref('foo').once('value', (foo) => {
        this.foo = foo.val()
        this.timeUntilHandshake = Math.round(performance.now() - this.startTime)
      })
    }
  },

  mounted () {
    this.startTime = performance.now()
    this.firebaseApp = firebase.initializeApp(window.firebaseConfig)
    this.authenticate()
  }
}
</script>

<style scoped>

</style>
