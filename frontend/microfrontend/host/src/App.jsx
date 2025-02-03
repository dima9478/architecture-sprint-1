import React, {lazy, Suspense, useEffect} from "react";
import ReactDOM from "react-dom/client";

import {Route, BrowserRouter as Router, Switch, useHistory} from "react-router-dom"; ``
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";
import Footer from "./components/Footer";

import './index.css'

const Register = lazy(() => import('auth/Register').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
}));
const Login = lazy(() => import('auth/Login').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
}));


function App() {
    const [currentUser, setCurrentUser] = React.useState({});

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    // const [email, setEmail] = React.useState("");

    const history = useHistory();

    useEffect(() => {
        addEventListener("user-logged", (e) => {
            setIsLoggedIn(true);
            history.push("/");
        });
        addEventListener("user-unlogged", (e) => {
            setIsLoggedIn(false);
            history.push("/signin");
        });
        addEventListener("auth-registerd", (e) => {
            history.push("/signin");
        })
        addEventListener("user-changed", (e) => {
            setCurrentUser(e.detail);
        });
    }, []);


    return (

            <div className="page__content">
                <Header email={currentUser.email} />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        currentUser={currentUser}
                        component={Main}
                        loggedIn={isLoggedIn}
                    />
                    <Route path="/signup">
                        <Suspense><Register /></Suspense>
                    </Route>
                    <Route path="/signin">
                        <Suspense><Login /></Suspense>
                    </Route>
                </Switch>
                <Footer />
            </div>

    );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<Router>
             <App />
            </Router>)