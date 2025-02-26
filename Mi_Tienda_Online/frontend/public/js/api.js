const API_URL = "http://localhost:4000/api";

// Obtener productos
async function obtenerProductos() {
    try {
        const respuesta = await fetch(`${API_URL}/productos`);
        const productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// Registrar usuario
async function registrarUsuario(nombre, email, password) {
    const respuesta = await fetch(`${API_URL}/usuarios/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
    });
    return respuesta.json();
}

// Login de usuario con JWT
async function loginUsuario(email, password) {
    const respuesta = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await respuesta.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login exitoso");
        window.location.href = "index.html";
    } else {
        alert("Error en login");
    }
}
