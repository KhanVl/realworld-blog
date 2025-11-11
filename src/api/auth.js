import { apiRequest } from "./client";

export function registerUser({ username, email, password }) {
    return apiRequest("/users", {
        method: "POST",
        body: JSON.stringify({
            user: { username, email, password },
        }),
    });
}

export function loginUser({ email, password }) {
    return apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({
            user: { email, password },
        }),
    });
}

export function getCurrentUser() {
    return apiRequest("/user", { method: "GET" }, true);
}

export function updateUser(user) {
    return apiRequest(
        "/user", {
            method: "PUT",
            body: JSON.stringify({ user }),
        },
        true
    );
}