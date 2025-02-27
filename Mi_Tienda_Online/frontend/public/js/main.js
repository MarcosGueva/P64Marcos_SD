document.addEventListener("DOMContentLoaded", async () => {
    console.log("📢 main.js cargado, intentando obtener productos...");
    await obtenerProductos();
});

async function obtenerProductos() {
    try {
        const respuesta = await fetch(`${API_URL}/productos`);
        const productos = await respuesta.json();
        console.log("✅ Productos obtenidos:", productos);
        mostrarProductos(productos);
    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
    }
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos-lista");
    contenedor.innerHTML = ""; // Limpiar antes de agregar productos

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card p-3 shadow">
                    <h5>${producto.nombre}</h5>
                    <p>${producto.descripcion}</p>
                    <p><strong>Precio: $${producto.precio}</strong></p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${producto._id}', '${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
                </div>
            </div>
        `;
    });
}
