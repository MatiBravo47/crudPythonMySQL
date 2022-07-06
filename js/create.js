function guardar() {
  let n = document.getElementById("txtGP").value;
  let p = document.getElementById("txtCircuito").value;
  let s = document.getElementById("txtFecha").value;
  let f = document.getElementById("txtFoto").value;

  let producto = {
    GP: n,
    circuito: p,
    fecha: s,
    foto: f,
  };
  let url = "http://localhost:5000/productos";
  var options = {
    body: JSON.stringify(producto),
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // redirect: 'follow'
  };
  fetch(url, options)
    .then(function () {
      console.log("creado");
      alert("Guardado");

      // Handle response we get from the API
    })
    .catch((err) => {
      //this.errored = true
      alert("Error al guardar");
      console.error(err);
    });
}
