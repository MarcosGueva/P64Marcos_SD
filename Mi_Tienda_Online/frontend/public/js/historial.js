document.addEventListener("DOMContentLoaded", async () => {
    console.log("📢 historial.js cargado, obteniendo historial...");

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Debes iniciar sesión para ver el historial.");
        window.location.href = "login.html";
        return;
    }

    try {
        const respuesta = await fetch("http://localhost:4000/api/pedidos", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const pedidos = await respuesta.json();
        if (!respuesta.ok) throw new Error("Error al obtener el historial");

        mostrarHistorial(pedidos);
    } catch (error) {
        console.error("Error al obtener el historial:", error);
        alert("❌ No se pudo cargar el historial.");
    }
});

// ✅ Mostrar el historial de compras
function mostrarHistorial(pedidos) {
    const historialLista = document.getElementById("historial-lista");
    historialLista.innerHTML = "";

    if (pedidos.length === 0) {
        historialLista.innerHTML = "<p class='text-center'>No hay compras registradas.</p>";
        return;
    }

    pedidos.forEach(pedido => {
        const fecha = new Date(pedido.fecha).toLocaleString();
        let productosHTML = pedido.productos.map(p => `<li>${p.nombre} - ${p.cantidad} x $${p.precio}</li>`).join("");

        historialLista.innerHTML += `
            <li class="list-group-item">
                <strong>Fecha:</strong> ${fecha}<br>
                <strong>Total:</strong> $${pedido.total}<br>
                <ul>${productosHTML}</ul>
            </li>
        `;
    });
}
