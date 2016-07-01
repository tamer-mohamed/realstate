import Firebase from 'firebase';

const auth = (function(){

  function requireAuth(nextState, replace){
    if(Firebase.auth().currentUser === null){
      replace({
        pathname: `${nextState.params.lang}/user/login`,
        state: {nextPathname: nextState.location.pathname}
      })
    }
  }


  return {
    requireAuth
  }

})();

export default auth;
