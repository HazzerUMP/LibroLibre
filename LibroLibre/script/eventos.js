function mostrarLibros(lista, contenedorID = "lista-sugeridos") {
  const contenedor = document.getElementById(contenedorID);
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron libros.</p>";
    return;
  }

  lista.forEach(libro => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <strong>${libro.titulo}</strong><br>
      <strong>Autor:</strong> ${libro.autor}<br>
      <strong>Género:</strong> ${libro.genero}<br>
      <p>${libro.sinopsis}</p>
    `;
    contenedor.appendChild(div);
  });
}

function buscarLibros() {
  const termino = document.getElementById("busqueda").value.toLowerCase();
  const filtrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(termino) ||
    libro.autor.toLowerCase().includes(termino) ||
    libro.genero.toLowerCase().includes(termino)
  );
  mostrarLibros(filtrados, "lista-sugeridos");
  console.log(`Se encontraron ${filtrados.length} libro(s)`);
}

function validarEmail(correo) {
  const atIndex = correo.indexOf("@");
  const dotIndex = correo.lastIndexOf(".");
  return (
    atIndex > 0 &&
    dotIndex > atIndex + 1 &&
    dotIndex < correo.length - 1
  );
}

function registrarUsuario() {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  if (!nombre || !correo || !contrasena) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  if (!validarEmail(correo)) {
    alert("El correo electrónico ingresado no es válido.");
    return;
  }

  alert(`Registro exitoso. Bienvenido a LibroLibre, ${nombre}!`);
}

function obtenerLibrosAleatorios(cantidad) {
  const copia = [...libros];
  const resultado = [];
  for (let i = 0; i < cantidad && copia.length > 0; i++) {
    const index = Math.floor(Math.random() * copia.length);
    resultado.push(copia.splice(index, 1)[0]);
  }
  return resultado;
}

window.onload = () => {
  const sugeridos = obtenerLibrosAleatorios(3);
  mostrarLibros(sugeridos, "lista-sugeridos");
};
