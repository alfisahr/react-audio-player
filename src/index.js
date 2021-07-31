import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import store from "./stores";
import { saveState, getState } from "./stores/localStore";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

getState().then((localState) => {
   let globalStore;
   //  if (process.env.NODE_ENV === "development") {
   const middleware = [thunk];
   globalStore = createStore(store, localState, composeWithDevTools(applyMiddleware(...middleware)));
   //  } else {
   //     globalStore = createStore(store, localState);
   //  }
   // mediaNotification.setStore(store);
   globalStore.subscribe(() => {
      saveState({
         songs: globalStore.getState().songs,
      });
   });
   ReactDOM.render(
      <Provider store={globalStore}>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </Provider>,
      document.getElementById("root")
   );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
