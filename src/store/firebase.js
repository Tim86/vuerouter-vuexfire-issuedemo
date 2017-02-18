import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCkQ0SVkhrfPZAD9KRQfXfIkuDzNfiqYPE',
  authDomain: 'scoreboard-simple.firebaseapp.com',
  databaseURL: 'https://scoreboard-simple.firebaseio.com',
  storageBucket: 'scoreboard-simple.appspot.com',
  messagingSenderId: '846165208308'
}

console.log('firebase init')
// firebase.initializeApp(config)

// const database = firebase.database()

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

const localcompetitorsRef = db.ref('competitors')
const localcompetitionRef = db.ref('competition')
// export const auth = firebase.auth()
// export const storage = firebase.storage()

// export const getRef = function (path) {
//   return {
//     // ()=>{ db.ref(path) },
//     // getRef,
//     competitorsRef,
//     competitionRef
//   }
// }

export const competitorsRef = localcompetitorsRef
export const competitionRef = localcompetitionRef