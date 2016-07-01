import App from './components/App';
import Home from './components/Home';
import About from './components/AboutUs';
import Contact from './components/Contact';
import Login from './components/Login';
import PropertySingle from './components/PropertySingle';
import Properties from './components/Properties';
import Registration from './components/Registration';

// user
import PropertyAdd from './components/secure/PropertyAdd';

const routes = [
  {
    path: '/',
    component: App,
    onEnter: function(nextState, replace){
      //if(supportedLangs.indexOf(nextState.location.pathname) === -1){
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
              {path:"register", component: Registration},
              {
                path: 'properties',
                indexRoute: {component: Properties},
                childRoutes: [
                  {
                    path: 'add',
                    component: PropertyAdd
                  }
                ]
              }
            ]

          },
          {

            // user screens
            path: 'properties',
            indexRoute: {component: Properties},
            childRoutes: [
              {
                path: ':propertyId',
                component: PropertySingle
              }
            ]

          }
        ]
      }
    ]
  }
];

export default routes;