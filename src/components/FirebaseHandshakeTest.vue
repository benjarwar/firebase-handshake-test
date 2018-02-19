<template>
  <div>
    <h1>Firebase Handshake Test</h1>
    <h2>Signed in to Firebase: {{uid}}</h2>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'FirebaseHandshakeTest',

  data () {
    return {
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
    }
  },

  mounted () {
    this.firebaseApp = firebase.initializeApp(window.firebaseConfig)
    this.authenticate()
  }
}
</script>

<style scoped>

</style>
