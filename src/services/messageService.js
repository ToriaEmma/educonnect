import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db } from './firebaseService';

// Créer une nouvelle conversation
export async function createConversation(userId1, userId2) {
  try {
    const conversationsRef = collection(db, 'conversations');
    
    // Vérifier si la conversation existe déjà
    const q = query(
      conversationsRef,
      where('participants', 'array-contains', userId1)
    );
    const snapshot = await getDocs(q);
    
    let existingConv = null;
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.participants.includes(userId2)) {
        existingConv = { id: doc.id, ...data };
      }
    });
    
    if (existingConv) return existingConv;
    
    // Créer nouvelle conversation
    const newConv = await addDoc(conversationsRef, {
      participants: [userId1, userId2],
      lastMessage: '',
      lastMessageTime: serverTimestamp(),
      createdAt: serverTimestamp()
    });
    
    return { id: newConv.id, participants: [userId1, userId2] };
  } catch (error) {
    console.error('Erreur création conversation:', error);
    throw error;
  }
}

// Envoyer un message
export async function sendMessage(conversationId, senderId, senderName, text) {
  try {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    
    await addDoc(messagesRef, {
      senderId,
      senderName,
      text,
      timestamp: serverTimestamp(),
      read: false
    });
    
    return { success: true };
  } catch (error) {
    console.error('Erreur envoi message:', error);
    throw error;
  }
}

// Écouter les messages en temps réel
export function subscribeToMessages(conversationId, callback) {
  const messagesRef = collection(db, 'conversations', conversationId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
}

// Récupérer toutes les conversations d'un utilisateur
export function subscribeToConversations(userId, callback) {
  const conversationsRef = collection(db, 'conversations');
  const q = query(
    conversationsRef,
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTime', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const conversations = [];
    snapshot.forEach((doc) => {
      conversations.push({ id: doc.id, ...doc.data() });
    });
    callback(conversations);
  });
}

// Récupérer les infos d'un utilisateur par son ID
export async function getUserInfo(userId) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', userId));
    const snapshot = await getDocs(q);
    
    let userInfo = null;
    snapshot.forEach((doc) => {
      userInfo = { id: doc.id, ...doc.data() };
    });
    
    return userInfo;
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
    return null;
  }
}
