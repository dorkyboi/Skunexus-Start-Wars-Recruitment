import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./store";
import Router from "./router";
import {BrowserRouter} from "react-router-dom";

// Data from API does not have ID fields
// Using URL to extract identifier because it's the only place with ID

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
