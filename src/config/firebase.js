import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA5i567cQZCn--GUTK2BjLtKWIHgxcB5IQ",
  authDomain: "chat-app-c642e.firebaseapp.com",
  projectId: "chat-app-c642e",
  storageBucket: "chat-app-c642e.firebasestorage.app",
  messagingSenderId: "883910950586",
  appId: "1:883910950586:web:345385e5aeef2a0840cc83",
  measurementId: "G-CPY268R897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There i am using Chat App",
      lastSeen: Date.now()
    })
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: []
    })
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }

}

const login = async (email,password)=> {
  try {
    await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }

}

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
  
}

const resetPass = async (email)=>{
    if (!email) {
      toast.error("Enter Your Email");
      return null;
    }
    try {
      const userRef = collection(db,"users");
      const q = query(userRef, where("email","==",email));
      const querysnap = await getDocs(q);
      if (!querysnap.empty) {
        await sendPasswordResetEmail(auth,email);
        toast.success("Email Sent")
      }
      else{
        toast.error("Email Not Found");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
}

export { signup , login , logout , auth , db, resetPass}
