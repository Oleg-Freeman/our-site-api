const { DrawingModel } = require('../models');
const { CustomError } = require('../utils');

async function createDrawing(user, data) {
    const { strokeWidth, strokeColor, drawMode, paths = [], name  } = data;

    let drawing = await DrawingModel.findOne({ name });

    if (drawing) {
        throw new CustomError(400, 'Drawing with this name already exists');
    }

    drawing = await DrawingModel.create({
        user_id: user._id,
        stroke_width: strokeWidth || 5,
        stroke_color: strokeColor || '#000000',
        draw_mode: drawMode || true,
        paths, name
    });

    return drawing;
}

async function getDrawingShortList() {
    const drawings = await DrawingModel.find({}, '-paths -draw_mode -stroke_width -stroke_color');

    return drawings || [];
}

async function getDrawingById(id) {
    const drawing = await DrawingModel.findById(id);

    if (!drawing) {
        throw new CustomError(404, 'Drawing not found');
    }

    return drawing;
}

async function deleteDrawing(id) {
    const drawing = await DrawingModel.findById(id);

    if (!drawing) {
        throw new CustomError(404, 'Drawing not found');
    }

    await DrawingModel.findByIdAndDelete(id);
}

module.exports = {
    createDrawing,
    getDrawingShortList,
    getDrawingById,
    deleteDrawing
}