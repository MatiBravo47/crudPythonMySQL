var args = location.search.substr(1).split("&");
// lee los argumentos pasados a este formulario
var parts = [];
for (let i = 0; i < args.length; ++i) {
  parts[i] = args[i].split("=");
}
console.log(args);
document.getElementById("txtId").value = parts[0][1];
document.getElementById("txtGP").value = parts[1][1];
document.getElementById("txtCircuito").value = parts[2][1];
document.getElementById("txtFecha").value = parts[3][1];

function modificar() {
  let id = document.getElementById("txtId").value;
  let n = document.getElementById("txtGP").value;
  let p = document.getElementById("txtCircuito").value;
  let s = document.getElementById("txtFecha").value;
  let producto = {
    GP: n,
    circuito: p,
    fecha: s,
  };
  let url = "http://localhost:5000/productos/" + id;
  var options = {
    body: JSON.stringify(producto),
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };
  fetch(url, options)
    .then(function () {
      console.log("modificado");
      alert("Registro modificado");
      // Handle response we get from the API
    })
    .catch((err) => {
      //this.errored = true
      console.error(err);
      alert("Error al Modificar");
    });
}
