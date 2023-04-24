const socket = io();

socket.on("products", (data) => {
  let ul = document.getElementById("productsList");

  data.forEach((prod) => {
    let contenido = document.createElement("li");
    contenido.innerHTML = `
     <p>${prod.title}</p>
    <p>Descripcion: ${prod.description}</p>
    <p>Categoría: ${prod.category}</p>
    <p>Precio: $${prod.price}</p>
   <p>Stock: ${prod.stock}</p>
     `;
    ul.append(contenido);
  });
});
