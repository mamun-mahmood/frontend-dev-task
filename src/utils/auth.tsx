
const checkAuth = () => {
    const tokenData = localStorage.getItem("stack-token");
    const user = tokenData ? JSON.parse(tokenData) : "";
    const { email, token } = user;

    if (email && token) {
        return { email, token, isLoggedIn: true}
    }
    else {
        return {isLoggedIn: false}
    }
}

export default checkAuth
