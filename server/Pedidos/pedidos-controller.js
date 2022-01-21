const res = require("express/lib/response");
const Pedido = require("./models");
//const Pedidos = new Pedido();
require("./models");

const registrarPedido = async function (req, res) {
  try {
    let nuevoPedido = new Pedido(req.body);
    await nuevoPedido.save();
    return res.status(200).send("Pedido enviado con éxito");
  } catch (error) {
    return res
      .status(400)
      .send({ error: error, mensaje: "Hubo un problema con su petición" });
  }
};

const traerPedidoDB = async function(req, res) {
  try {
    let usuarioId = req.params.idUsuario;

    let pedidosOnDB = await Pedido.find({ idUsuario: usuarioId });
    if(pedidosOnDB){
      return res.status(200).json(pedidosOnDB);
    } else {
      return res.status(200).send('No hay pedidos hechos por el usuario');
    }

} catch (error) {
    return res
      .status(400)
      .send({ error: error, mensaje: "Hubo un problema con su petición" });
  }

  
};

const eliminarPedido = async function (req, res) {
  try {
    let pedidoId = req.params.id;
    let pedidoEliminado = await Pedido.deleteOne({ _id: pedidoId })
  
    return res.status(200).json(pedidoEliminado);

  } catch (error) {
    return res
      .status(400)
      .send({ error: error, mensaje: "Hubo un problema con su petición" });
  }
  
};

const traerTodosPedidos = async function(req, res){
  try {

    let pedidos = await Pedido.find({});
    
    if(pedidos){
      return res.status(200).json(pedidos);
    } else {
      return res.status(200).json({
        mensaje: "No hay pedidos realizados todavía"
      });

    }
    
  } catch (error) {
    return res
    .status(400)
    .send({ error: error, mensaje: "Hubo un problema con su petición" }); 
  }
};

module.exports = {
  registrarPedido: registrarPedido,
  traerPedidoDB: traerPedidoDB,
  eliminarPedido: eliminarPedido,
  traerTodosPedidos: traerTodosPedidos,
};
