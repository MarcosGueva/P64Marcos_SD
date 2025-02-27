document.addEventListener("DOMContentLoaded", () => {
    console.log("📢 carrito.js cargado, mostrando carrito...");
    mostrarCarrito();
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
    const listaCarrito = document.getElementById("carrito-lista");
    if (!listaCarrito) return; // Evita errores si la página no tiene `carrito-lista`

    listaCarrito.innerHTML = "";
    
    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p class='text-center'>El carrito está vacío.</p>";
        return;
    }

    carrito.forEach((item, index) => {
        listaCarrito.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.nombre} - $${item.precio} x ${item.cantidad}
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>
            </li>
        `;
    });

    listaCarrito.innerHTML += `
        <li class="list-group-item"><strong>Total: $${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}</strong></li>
        <button class="btn btn-success mt-3" onclick="finalizarCompra()">Pagar</button>
    `;
}

function agregarAlCarrito(id, nombre, precio) {
    const productoExistente = carrito.find(item => item.id === id);
    productoExistente ? productoExistente.cantidad++ : carrito.push({ id, nombre, precio, cantidad: 1 });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

async function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    
    const token = localStorage.getItem("token");
    if (!token) {
        alert("🔒 Debes iniciar sesión para pagar.");
        window.location.href = "login.html";
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/pedidos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ productos: carrito, total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0) })
        });

        if (!respuesta.ok) throw new Error("Error en la compra");
        alert("✅ Compra realizada con éxito.");
        localStorage.removeItem("carrito");
        carrito = [];
        mostrarCarrito();
        window.location.href = "historial.html";
    } catch (error) {
        console.error("Error al procesar el pedido:", error);
        alert("❌ No se pudo procesar el pedido.");
    }
}


// ✅ Agregar un producto al carrito (permite múltiples unidades)
window.agregarAlCarrito = function(id, nombre, precio) {
    const productoExistente = carrito.find(item => item.id === id);
    productoExistente ? productoExistente.cantidad++ : carrito.push({ id, nombre, precio, cantidad: 1 });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    mostrarCarrito();
};

// ✅ Cambiar la cantidad de un producto en el carrito
window.cambiarCantidad = function(index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCarrito();
};

// ✅ Eliminar un producto del carrito
window.eliminarDelCarrito = function(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCarrito();
};

// ✅ Actualizar el contador del carrito en la navbar
window.actualizarCarrito = function() {
    document.getElementById("carrito-contador").textContent = carrito.length;
};

// ✅ Finalizar la compra
window.finalizarCompra = async function() {
    if (carrito.length === 0) {
        return alert("El carrito está vacío.");
    }

    const token = localStorage.getItem("token");
    if (!token) {
        return alert("Debes iniciar sesión para pagar."), window.location.href = "login.html";
    }

    try {
        const respuesta = await fetch("http://localhost:4000/api/pedidos", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ productos: carrito, total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0) })
        });

        if (!respuesta.ok) throw new Error("Error en la compra");

        alert("✅ Compra realizada con éxito.");
        localStorage.removeItem("carrito");
        carrito = [];
        mostrarCarrito();
        window.location.href = "historial.html";
    } catch (error) {
        console.error("Error al procesar el pedido:", error);
        alert("❌ No se pudo procesar el pedido.");
    }
};
