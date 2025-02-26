document.addEventListener("DOMContentLoaded", () => {
    console.log("📢 Página cargada");
    obtenerProductos();
});

function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";
    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>Precio: $${producto.precio}</strong></p>
                <button onclick="agregarAlCarrito('${producto._id}')">Agregar al Carrito</button>
            </div>
        `;
    });
}
