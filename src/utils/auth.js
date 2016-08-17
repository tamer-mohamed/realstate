import Firebase from 'firebase';

const auth = (function(){

  function requireAuth(nextState, replace, callback){
    console.log('CALLED');
    Firebase.auth().onAuthStateChanged((user)=>{
      console.log(user);
      if(user === null){
        console.log(user);
        replace({
          pathname: `${nextState.params.lang}/user/login`,
          state: {nextPathname: nextState.location.pathname}
        })
      }
      else{
        callback();
      }
    });
  }

  function login(mail, pass, cb){
    return Firebase.auth().signInWithEmailAndPassword(mail, pass);
  }

  function sendResetPassword(email){
    console.log(email);
    return Firebase.auth().sendPasswordResetEmail(email);
  }

  function confirmResetPassword(code, password){
    return Firebase.auth().confirmPasswordReset(code, password);
  }


  return {
    requireAuth,
    login,
    sendResetPassword,
    confirmResetPassword
  }

})();

export default auth;
