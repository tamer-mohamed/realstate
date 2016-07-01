import Firebase from 'firebase';

const auth = (function(){

  function requireAuth(nextState, replace){
    console.log('======================',nextState);
    console.log('======================',Firebase.auth().currentUser);
    if(!Firebase.auth().currentUser){
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
