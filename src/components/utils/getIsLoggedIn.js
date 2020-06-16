const getIsLoggedIn = () => window.localStorage.getItem("loggedIn") || false;

export default getIsLoggedIn;
