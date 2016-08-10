import App from './components/App';
import Home from './components/Home';
import About from './components/AboutUs';
import Contact from './components/Contact';
import Login from './components/Login';
import PropertySingle from './components/PropertySingle';
import Properties from './components/Properties';
import MyProperties from './components/secure/MyProperties';
import PropertyManage from './components/secure/PropertyManage';
import Registration from './components/Registration';
import Error404 from './components/Error404';
import UserProfile from './components/secure/UserProfile';
import UserEditProfile from './components/secure/UserEditProfile';
import Verification from './components/Registeration.step2';
import qwest from 'qwest';
import constants from './constants';


// user
import PropertyAdd from './components/secure/PropertyAdd';

//utils
import auth from './utils/auth';


const routes = [
  {
    path: '/',
    component: App,
    onEnter: function(nextState, replace){
      if(nextState.location.pathname === "/" || nextState.location.pathname === ""){
        replace("/ar");
      }
    },
    childRoutes: [
      {
        path: ':lang',
        indexRoute: {component: Home},
        childRoutes: [

          // pages
          {path: 'about', component: About},
          // contact us
          {path: 'contact', component: Contact},
          {
            path: "properties",
            indexRoute: {component: Properties},
            childRoutes: [
              {path: ":propertyId", component: PropertySingle}
            ]
          },
          {

            // user screens
            // {lang}/user
            path: 'user',
            indexRoute: {component: Properties},
            childRoutes: [

              // TODO: redirect to dashboard in case user logged in
              {path: "register", component: Registration},
              {path: "verify/:activationKey", component: Verification},
              {path: "login", component: Login},
              {

                // user dashboard
                path: 'dashboard',
                onEnter: auth.requireAuth,
                indexRoute: {component: Properties},
                childRoutes: [
                  {
                    path: 'properties',
                    indexRoute: {component: MyProperties},
                    childRoutes: [
                      {
                        path: 'add',
                        component: PropertyAdd
                      },
                      {
                        path: 'manage/:propId',
                        component: PropertyManage
                      }
                    ]
                  }
                ]
              },
              {

                // user profile
                path: 'profile',
                onEnter: auth.requireAuth,
                indexRoute: {component: UserProfile},
                childRoutes: [
                  {
                    path: 'edit',
                    component: UserEditProfile
                  }
                ]
              }
            ]
          },
          {
            // user screens
            path: '*', component: Error404
          }
        ]
      }
    ]
  }
];

export default routes;
