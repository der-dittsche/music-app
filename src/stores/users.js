import { defineStore } from "pinia";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth } from "./firebase";
import { db } from "@/stores/firebase";
import router from "../router";

let usersCollectionRef;
let usersCollectionQuerry;
let getUsersSnapshot = null;

export const useUserStore = defineStore("storeUser", {
  state: () => {
    return {
      users: [],
      user: {},
      usersLoaded: false,
    };
  },
  actions: {
    initUser() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.user.username = "";
          usersCollectionRef = collection(db, "users", this.user.id, "details");
          usersCollectionQuerry = query(usersCollectionRef);
          this.getUsers();
          router.push("/");
        } else {
          this.user = {};
          this.clearUsers();
          router.replace("/");
        }
      });
    },
    async getUsers() {
      this.usersLoaded = false;
      getUsersSnapshot = onSnapshot(usersCollectionQuerry, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const userdetails = {
            id: doc.id,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            email: doc.data().email,
            username: doc.data().username,
            birthday: doc.data().birthday,
            tos: doc.data().tos,
            userid: doc.data().userid,
          };
          users.push(userdetails);
          this.user.username = userdetails.username;
        });
        this.users = users;
        this.usersLoaded = true;
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.auth_email,
        credentials.auth_password_confirmed
      )
        .then(() => {
          this.addUser(credentials);
          router.push({ name: "home" });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(
        auth,
        credentials.login_email,
        credentials.login_password
      )
        .then(() => {
          this.initUser();
          router.push({ name: "home" });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addUser(credentials) {
      usersCollectionRef = collection(db, "users", this.user.id, "details");
      await addDoc(usersCollectionRef, {
        email: credentials.auth_email,
        username: credentials.auth_username,
        firstname: credentials.auth_firstname,
        lastname: credentials.auth_lastname,
        birthday: credentials.auth_birthday,
        tos: credentials.auth_tos,
        userid: this.user.id,
      });
    },
    async updateUser(infos) {
      usersCollectionRef = collection(db, "users", this.user.id, "details");
      await updateDoc(doc(usersCollectionRef, infos.id), {
        email: infos.email,
        firstname: infos.firstname,
        lastname: infos.lastname,
        username: infos.username,
        birthday: infos.birthday,
        tos: infos.birthday,
        userid: infos.id,
      });
    },
    clearUsers() {
      this.users = [];
      if (getUsersSnapshot) getUsersSnapshot(); // unsubscribe from any listener
    },
  },
});
