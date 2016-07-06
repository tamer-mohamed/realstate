import Firebase from 'firebase';

const auth = (function(){

  function requireAuth(nextState, replace, callback){

    firebase.auth().onAuthStateChanged((user)=>{
      if(user === null){
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
