

// 🔹 Verificar si el usuario es administrador
document.addEventListener("DOMContentLoaded", async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "admin") {
        alert("🚫 Acceso denegado. Debes ser administrador.");
        window.location.href = "index.html";
        return;
    }
    
    obtenerProductos();
    obtenerPedidos();
});

// 🔹 Obtener productos y mostrarlos en la tabla
async function obtenerProductos() {
    try {
        const respuesta = await fetch(`${API_URL}/productos`);
        const productos = await respuesta.json();

        const tabla = document.getElementById("productos-lista");
        tabla.innerHTML = productos.map(producto => `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>$${producto.precio}</td>
                <td><img src="${producto.imagen}" width="50"></td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarProducto('${producto._id}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${producto._id}')">Eliminar</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// 🔹 Agregar un producto
document.getElementById("form-producto").addEventListener("submit", async (event) => {
    event.preventDefault();
    const nuevoProducto = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: parseFloat(document.getElementById("precio").value),
        imagen: document.getElementById("imagen").value
    };

    try {
        const respuesta = await fetch(`${API_URL}/productos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoProducto)
        });

        if (!respuesta.ok) throw new Error("Error al agregar producto.");
        
        alert("✅ Producto agregado con éxito.");
        obtenerProductos();
        event.target.reset();
    } catch (error) {
        console.error(error);
    }
});

// 🔹 Eliminar producto
async function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
        await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
        obtenerProductos();
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
}

// 🔹 Obtener pedidos
async function obtenerPedidos() {
    try {
        const respuesta = await fetch(`${API_URL}/pedidos`);
        const pedidos = await respuesta.json();

        const tabla = document.getElementById("pedidos-lista");
        tabla.innerHTML = pedidos.map(pedido => `
            <tr>
                <td>${pedido.usuario}</td>
                <td>${pedido.productos.map(p => `${p.nombre} (x${p.cantidad})`).join(", ")}</td>
                <td>$${pedido.total}</td>
                <td>${pedido.estado}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="actualizarEstado('${pedido._id}', 'Enviado')">Marcar Enviado</button>
                    <button class="btn btn-success btn-sm" onclick="actualizarEstado('${pedido._id}', 'Entregado')">Marcar Entregado</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
    }
}

// 🔹 Actualizar estado del pedido
async function actualizarEstado(id, estado) {
    try {
        await fetch(`${API_URL}/pedidos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado })
        });

        obtenerPedidos();
    } catch (error) {
        console.error("Error al actualizar estado:", error);
    }
}

// 🔹 Cerrar sesión
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    alert("Sesión cerrada.");
    window.location.href = "login.html";
}
