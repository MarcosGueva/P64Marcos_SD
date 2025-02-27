
// ✅ **Función para iniciar sesión**
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

        if (respuesta.ok) {
            // ✅ Guardar usuario y token en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            alert("✅ Inicio de sesión exitoso");
            window.location.href = "index.html"; // Redirigir a la tienda
        } else {
            alert("❌ Error en login: " + data.error);
        }
    } catch (error) {
        console.error("Error en login:", error);
    }
}

// ✅ **Función para cerrar sesión**
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    alert("🔒 Sesión cerrada.");
    window.location.href = "login.html";
}

// ✅ **Función para verificar sesión y actualizar la UI**
function verificarSesion() {
    console.log("📢 auth.js cargado, verificando sesión...");

    const usuarioData = localStorage.getItem("usuario");
    const usuario = usuarioData ? JSON.parse(usuarioData) : null;

    const btnAuth = document.getElementById("btn-auth");
    const userInfo = document.getElementById("usuario-info");

    if (usuario) {
        // ✅ Si hay un usuario, mostrar su nombre y la opción de cerrar sesión
        userInfo.textContent = `👤 ${usuario.nombre}`;
        userInfo.style.display = "inline";
        btnAuth.textContent = "Cerrar Sesión";
        btnAuth.onclick = logout;
    } else {
        // ✅ Si no hay usuario, mostrar la opción de iniciar sesión
        userInfo.style.display = "none";
        btnAuth.textContent = "Iniciar Sesión / Registrarse";
        btnAuth.onclick = () => window.location.href = "login.html";
    }
}

// ✅ **Ejecutar `verificarSesion()` cuando se cargue la página**
document.addEventListener("DOMContentLoaded", verificarSesion);
