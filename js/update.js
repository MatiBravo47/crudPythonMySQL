//Divide el enlace en cada "&" que aparece 
var args = location.search.substr(1).split("&");
// lee los argumentos pasados a este formulario
var parts = [];
for (let i = 0; i < args.length; ++i) {
  parts[i] = args[i].split("=");
}
console.log(args);
var re= /%20/gi;
document.getElementById("txtId").value = parts[0][1];
document.getElementById("txtGP").value = parts[1][1].replace(re,' ');
document.getElementById("txtCircuito").value = parts[2][1].replace(re,' ');
document.getElementById("txtFecha").value = parts[3][1];
document.getElementById("txtFoto").value = parts [4][1];
document.getElementById("txtRonda").value = parts [5][1];

function modificar() {
  let id = document.getElementById("txtId").value;
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
  let url = "https://crudf1.herokuapp.com/productos/" + id;
  //let url = "http://localhost:5000/productos/" + id;
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
      // window.location.href = "/CRUDPythonMySQL/index.html"
      window.location.href = "https://matibravo47.github.io/crudPythonMySQL/index.html"
      // Handle response we get from the API
    })
    .catch((err) => {
      //this.errored = true
      console.error(err);
      alert("Error al Modificar");
    });
    
}
