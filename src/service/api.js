import { db } from "./backend";
import firebase from "firebase";

export const idea = db.collection("idea");
export const tag = db.collection("tag");

export const signInWithEmailAndPassword = async function(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
export const registerWithEmailAndPassword = async function(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const logout = async function() {
  return await firebase.auth().signOut();
};
