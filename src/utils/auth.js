import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
import { writable } from 'svelte/store'


export const LoggedInState = writable(false)

// const emptyAuth = {

// }

export function logOut() {
    localStorage.removeItem("auth");
    LoggedInState.set(false)
    return true
}

//write function to check whethere there is a token stored or not, if there is then just set to true

export function getaccessTokenFromLocalStorage() {
    const auth = localStorage.getItem("auth")
    if (auth) {
        // return JSON.parse(auth)["accessToken"]
        LoggedInState.set(true)
    }
    return null
}

//write function for sign up

// export async function isLoggedIn() {
//     if (!getaccessTokenFromLocalStorage()) {
//         return false
//     }
    
//     try {
//         const resp = await fetch(
//             PUBLIC_BACKEND_BASE_URL + '/users',
//             {
//                 method: 'POST',
//                 mode: 'cors',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': getaccessTokenFromLocalStorage()
//                 }
//             }
//         )

//         const res = await resp.json()
//         if (resp.status == 200) {

//             localStorage.setItem("auth", JSON.stringify({
//                 "accessToken": res.accessToken,
//             }));
//             LoggedInState.set(true)
//             return true
//         }

//         return false
//     }   catch {
//         return false
//     }
// }

export async function authenticateUser(email, password) {
    const resp = await fetch(
        PUBLIC_BACKEND_BASE_URL + '/auth',
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const res = await resp.json();

    if (resp.status == 200) {
        localStorage.setItem("auth", JSON.stringify({
            "accessToken": res.accessToken
        }));

        LoggedInState.set(true)
        return {
            success: true,
            res: res
        }
    }

    return {
        success: false,
        res:res
    }
}