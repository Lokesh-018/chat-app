import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCPXV63NjfLspU3tX-CVFnqPso5448o2fo",
  authDomain: "chat-app-x18.firebaseapp.com",
  projectId: "chat-app-x18",
  storageBucket: "chat-app-x18.appspot.com",
  messagingSenderId: "371729946923",
  appId: "1:371729946923:web:0bc1ee6d16c82a5bb54d6e"
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
