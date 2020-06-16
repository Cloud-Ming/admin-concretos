import React, { useState } from "react";

let Usercontext = React.createContext();

let { Provider, Consumer } = Usercontext;

function UserProvider({ children }) {
    let [user, setUser] = useState({
        name: window.localStorage.getItem("nombre") || null,
        loggedIn: window.localStorage.getItem("loggedIn") || false,
    });

    function login(name) {
        window.localStorage.setItem("nombre", name);
        window.localStorage.setItem("loggedIn", true);

        setUser({
            name: name,
            loggedIn: true,
        });

        console.log("iniciando sesion");
    }

    function logout() {
        window.localStorage.clear();

        setUser({
            name: null,
            loggedIn: false,
        });

        console.log("cerrando sesion");
    }

    return <Provider value={{ user, login, logout }}>{children}</Provider>;
}

export { UserProvider, Consumer as UserConsumer, Usercontext };
