import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { createStore } from "redux";
import rootReducer from "./modules";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
