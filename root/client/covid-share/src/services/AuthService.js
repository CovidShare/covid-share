// Services are to help us connect to server side
// Contains fetch requests (controller functions) to our end points
// We dont want to store everything within the component

export default {
    login: user => {
        return fetch("/auth/login", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': "Application/json"
            }
        }).then(res => {
            if (res.status !== 401 && res.status === 200) // Passport responds 401 status if not authenticated and 200 if authenticated
                return (
                    res.json().then(data => data), // Authenticated
                    { message: { messageBody: "Succesfully logged in", messageError: false } }
                )
            else
                return console.log(res.status), {
                    isAuthenticated: false, user: { username: "", privilege: "" },
                    message: { messageBody: "Invalid username or password", messageError: true }
                };
        })
    },

    register: user => {
        return fetch("/auth/register", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': "Application/json"
            }
        })
            .then(res => res.json())
            .then(data => data);
    },

    logout: () => {
        return fetch('/auth/logout')
            .then(res => res.json())
            .then(data => data);
    },

    // Persistence with server (when browser closed, still authenticated). Used with context API (like a global state for the whole app)
    isAuthenticated: () => {
        return fetch('/auth/authenticated')
            .then(res => {
                if (res.status !== 401) // Passport automatically responds 401 status if not authenticated
                    return res.json().then(data => data); // Authenticated
                else
                    return { isAuthenticated: false, user: { username: "", privilege: "" } }; // not authenticated
            });
    }/*,

    getUserInfo: user => {
        console.log("USER",user)
        return fetch("/auth/profile", {
            method: "post",
            body: JSON.stringify({username: user.username}),
            headers: {
                'Content-Type': "Application/json"
            }
        }).then(res => {
            if (res.status !== 401 && res.status === 200) // Passport responds 401 status if not authenticated and 200 if authenticated
                return (
                    res.json().then(data => data)
                )
            else
                return {
                    message: { messageBody: "Unauthorized", messageError: true }
                };
        })
    }*/
}