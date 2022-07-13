function guardar() {
  let g = document.getElementById("txtGP").value;
  let c = document.getElementById("txtCircuito").value;
  let fe = document.getElementById("txtFecha").value;
  let fo = document.getElementById("txtFoto").value;
  let r = parseInt(document.getElementById("txtRonda").value);

  let producto = {
    GP: g,
    circuito: c,
    fecha: fe,
    foto: fo,
    ronda: r,
  };
  let url = "https://crudf1.herokuapp.com/productos";
  //let url = "http://localhost:5000/productos";
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
      window.location.href = "/CRUDPythonMySQL/index.html"

      // Handle response we get from the API
    })
    .catch((err) => {
      //this.errored = true
      alert("Error al guardar");
      console.error(err);
    });
}
