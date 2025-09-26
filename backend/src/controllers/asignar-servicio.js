const Servicio = require("../database/schemas/servicio");

// POST: asignar servicio (a vehículo, cubierta, chofer o flota)
const asignarServicio = async (req, res) => {
    try {
        const {
            vehiculoId,
            cubiertaId = null,
            descripcion,
            tipo,
            costo,
            observaciones,
            choferId = null,
            flotaId = null,   //ahora también aceptamos flotaId
        } = req.body;

        // Validaciones básicas
        if ((!vehiculoId && !flotaId) || !descripcion || !tipo) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const nuevoServicio = new Servicio({
            vehiculoId,
            cubiertaId,
            descripcion,
            tipo,
            costo,
            observaciones,
            choferId,
            flotaId,
        });

        const servicioGuardado = await nuevoServicio.save();
        res.status(201).json(servicioGuardado);
    } catch (error) {
        res.status(500).json({
            error: "Error al asignar servicio",
            detalles: error.message
        });
    }
};

// GET: listar todos los servicios asignados
const listarServiciosAsignados = async (req, res) => {
    try {
        const query = {};

        // Permitir filtrar por flotaId o vehiculoId desde query params
        if (req.query.flotaId) query.flotaId = req.query.flotaId;
        if (req.query.vehiculoId) query.vehiculoId = req.query.vehiculoId;

        const servicios = await Servicio.find(query)
            .populate("vehiculoId")
            .populate("cubiertaId")
            .populate("choferId")
            .populate("flotaId"); //populate flota también

        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener servicios asignados",
            detalles: error.message
        });
    }
};

module.exports = {
    asignarServicio,
    listarServiciosAsignados,
};