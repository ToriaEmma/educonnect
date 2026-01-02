import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

// Config Firebase - Chargé depuis le fichier .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// REGISTER
export async function registerUser(email, password, userData) {
  try {
    // Créer compte
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Sauvegarder les données dans Firestore
    const usersRef = collection(db, 'users');
    await addDoc(usersRef, {
      uid: user.uid,
      email: email,
      name: userData.name,
      role: userData.role,
      grade: userData.grade || null,
      school: userData.school || null,
      schoolName: userData.schoolName || null,
      city: userData.city || null,
      subjects: userData.subjects || [],
      hourlyRate: userData.hourlyRate || null,
      createdAt: new Date()
    });

    return { 
      uid: user.uid,
      userData: {
        uid: user.uid,
        email: email,
        name: userData.name,
        role: userData.role,
        grade: userData.grade,
        school: userData.school,
        schoolName: userData.schoolName,
        city: userData.city,
        subjects: userData.subjects,
        hourlyRate: userData.hourlyRate
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

// LOGIN
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Récupérer les données de l'utilisateur
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    
    let userData = null;
    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() };
    });

    return { success: true, user, userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// LOGOUT
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// GET CURRENT USER
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// GET ALL TEACHERS
export async function getAllTeachers() {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'teacher'));
    const querySnapshot = await getDocs(q);
    
    const teachers = [];
    querySnapshot.forEach((doc) => {
      teachers.push({ id: doc.id, ...doc.data() });
    });

    return teachers;
  } catch (error) {
    console.error('Error getting teachers:', error);
    return [];
  }
}

// GET ALL STUDENTS
export async function getAllStudents() {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'student'));
    const querySnapshot = await getDocs(q);
    
    const students = [];
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });

    return students;
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
}
