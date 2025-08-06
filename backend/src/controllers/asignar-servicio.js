const Servicio = require("../database/schemas/servicio");

// POST: asignar servicio a vehículo o cubierta
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
        } = req.body;

        if (!vehiculoId || !descripcion || !tipo) {
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
        });

        const servicioGuardado = await nuevoServicio.save();
        res.status(201).json(servicioGuardado);
    } catch (error) {
        res.status(500).json({ error: "Error al asignar servicio", detalles: error.message });
    }
};

// GET: mostrar solo los servicios asignados (vehiculoId != null)
const listarServiciosAsignados = async (req, res) => {
    try {
        const servicios = await Servicio.find({ vehiculoId: { $ne: null } })
            .populate("vehiculoId")
            .populate("cubiertaId")
            .populate("choferId");

        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener servicios asignados", detalles: error.message });
    }
};

module.exports = {
    asignarServicio,
    listarServiciosAsignados,
};