
#Importamos todo lo necesario para trabajar
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

#Creo objeto flask
app = Flask(__name__)
CORS(app)

# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Contrasql47!@localhost/flaskmysql'
#                                               usuario:clave@localhost/nombreBaseDatos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
# defino la tabla

#Por cada tabla que necesito en el sitio debo crear una clase 
class Producto(db.Model):   # la clase Producto hereda de db.Model
    # define los campos de la tabla
    id = db.Column(db.Integer, primary_key=True)
    GP = db.Column(db.String(100))
    circuito = db.Column(db.String(100))
    fecha = db.Column(db.String(100))
    foto = db.Column(db.String(100))

    def __init__(self, GP, circuito, fecha, foto):  # crea el  constructor de la clase
        self.GP = GP   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.circuito = circuito
        self.fecha = fecha
        self.foto = foto 


db.create_all()  # crea todas las tablas
#  ************************************************************


class ProductoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'GP', 'circuito', 'fecha', 'foto')


producto_schema = ProductoSchema()            # para crear un producto
productos_schema = ProductoSchema(many=True)  # multiples registros

#Defino cada una de las rutas 
@app.route('/productos', methods=['GET'])
def get_Productos():
    all_productos = Producto.query.all()     # query.all() lo hereda de db.Model
    # .dump() lo hereda de ma.schema
    result = productos_schema.dump(all_productos)
    return jsonify(result)


@app.route('/productos/<id>', methods=['GET'])
def get_producto(id):
    producto = Producto.query.get(id)
    return producto_schema.jsonify(producto)

#para borrar 
@app.route('/producto/<id>', methods=['DELETE'])
def delete_producto(id):
    producto = Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)


@app.route('/productos', methods=['POST'])  # crea ruta o endpoint
def create_producto():
    print(request.json)  # request.json contiene el json que envio el cliente
    GP = request.json['GP']
    circuito = request.json['circuito']
    fecha = request.json['fecha']
    foto = request.json['foto']
    new_producto = Producto(GP, circuito, fecha, foto)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)


@app.route('/productos/<id>', methods=['PUT'])
def update_producto(id):
    producto = Producto.query.get(id)

    GP = request.json['GP']
    circuito = request.json['circuito']
    fecha = request.json['fecha']
    foto = request.json['foto']

    producto.GP = GP
    producto.circuito = circuito
    producto.fecha = fecha
    producto.foto = foto
    db.session.commit()
    return producto_schema.jsonify(producto)


# programa principal *******************************
if __name__ == '__main__':
    app.run(debug=True, port=5000)
