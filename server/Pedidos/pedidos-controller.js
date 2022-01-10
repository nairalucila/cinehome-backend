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

    let pedidosOnDB = await Pedido.find({ idUsuario: usuarioId })
  
    return res.status(200).json(pedidosOnDB);

} catch (error) {
    return res
      .status(400)
      .send({ error: error, mensaje: "Hubo un problema con su petición" });
  }

  
};

const eliminarPedido = async function (req, res) {
  try {
    let pedidoId = req.params.id;
    let pedidoEliminado = await Pedido.deleteOne({ id: pedidoId })
  
    return res.status(200).json({obj: pedidoEliminado,
    mensaje: "Eliminado con éxito"});

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
};
