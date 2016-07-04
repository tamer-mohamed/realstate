import App from './components/App';
import Home from './components/Home';
import About from './components/AboutUs';
import Contact from './components/Contact';
import Login from './components/Login';
import PropertySingle from './components/PropertySingle';
import Properties from './components/Properties';
import MyProperties from './components/secure/MyProperties';
import Registration from './components/Registration';
import Error404 from './components/Error404';


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

            // user screens
            path: 'user',
            indexRoute: {component: Properties},
            childRoutes: [

              // TODO: redirect to dashboard in case user logged in
              {path: "register", component: Registration},
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
                      }
                    ]
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
