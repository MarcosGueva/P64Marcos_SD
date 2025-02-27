document.addEventListener("DOMContentLoaded", obtenerPedidos);

async function obtenerPedidos() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("🔒 Debes iniciar sesión para ver tus pedidos.");
        window.location.href = "login.html";
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/pedidos`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const pedidos = await respuesta.json();
        mostrarPedidos(pedidos);
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
    }
}


function mostrarPedidos(pedidos) {
    const contenedor = document.getElementById("pedidos-lista");
    contenedor.innerHTML = "";

    if (pedidos.length === 0) {
        contenedor.innerHTML = "<p>No tienes pedidos aún.</p>";
        return;
    }

    pedidos.forEach(pedido => {
        let productosHTML = pedido.productos.map(p => `<li>${p.productoId} - Cantidad: ${p.cantidad}</li>`).join("");
        contenedor.innerHTML += `
            <li class="list-group-item">
                <strong>Pedido #${pedido._id}</strong><br>
                <ul>${productosHTML}</ul>
                <strong>Total: $${pedido.total}</strong> - Estado: ${pedido.estado}
            </li>
        `;
    });
}
