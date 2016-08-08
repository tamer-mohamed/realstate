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
    Firebase.auth().signInWithEmailAndPassword(mail, pass).then((user)=>{
      console.log('Logged', user);
      cb();
    }).catch((e)=>{
      cb(e);
    });
  }

  function register(data){

  }


  return {
    requireAuth,
    login
  }

})();

export default auth;
