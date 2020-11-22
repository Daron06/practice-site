import { firebase } from './firebase';

const auth = firebase.auth();
const provider = new firebase.auth.GithubAuthProvider();

class AuthProvider {
  signIn() {
    auth.signInWithPopup(provider);
  }

  signOut() {
    firebase.auth().signOut();
  }
}

export const Auth = new AuthProvider();

export {provider};