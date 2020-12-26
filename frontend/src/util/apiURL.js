export const apiURL = () => {
    return window.location.hostname === "localhost" 
    ? "http://localhost:3005" 
    : "https://my-lifetrest-app.herokuapp.com";
};

