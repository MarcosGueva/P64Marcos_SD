let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const producto = { id, cantidad: 1 };
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = "";
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach(item => {
        carritoContainer.innerHTML += `
            <div>
                <p>Producto ID: ${item.id} - Cantidad: ${item.cantidad}</p>
            </div>
        `;
    });
}

function realizarPedido() {
    alert("Compra realizada con éxito!");
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
