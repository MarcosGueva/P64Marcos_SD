// auth.js - Mejoras en autenticación
async function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        const respuesta = await fetch(`${API_URL}/usuarios/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await respuesta.json();
        if (!respuesta.ok) throw new Error(data.error);

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        alert("✅ Inicio de sesión exitoso");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error en login:", error);
        alert("❌ Error en login: " + error.message);
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    alert("🔒 Sesión cerrada.");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const usuarioData = localStorage.getItem("usuario");
    const usuario = usuarioData ? JSON.parse(usuarioData) : null;
    if (!usuario) {
        if (window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
            alert("🔒 Debes iniciar sesión");
            window.location.href = "login.html";
        }
    }
});
