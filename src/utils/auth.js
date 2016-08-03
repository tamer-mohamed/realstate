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


  return {
    requireAuth
  }

})();

export default auth;
