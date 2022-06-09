import {Provider} from "react-redux";
import store from "./store";
import Router from "./router";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
