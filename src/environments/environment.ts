// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendUrl: 'https://teckers-backend.herokuapp.com',
  client: {
    username: 'ManagementApp',
    password: 'hs9foiwa'
  },
  firebaseConfig: {
    apiKey: 'AIzaSyB9F7DKchhPZhO-hGw1sp6zpX-Q9HAOUZ8',
    authDomain: 'teckers-app.firebaseapp.com',
    databaseURL: 'https://teckers-app.firebaseio.com',
    projectId: 'teckers-app',
    storageBucket: '',
    messagingSenderId: '442316004418',
    appId: '1:442316004418:web:c6d1170a0d42a7aa'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
