const { cars } = require("../models");

const getAllCars = async (req, res) => {
    try {
        const Cars = await cars.findAll({paranoid: false});
        res.status(200).json({
            status: "Success",
            message: "All cars data retrieved successfully.",
            isSuccess: true,
            data: Cars,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
};

const getCars = async (req, res) => {
    try {
        const Cars = await cars.findAll();
        res.status(200).json({
            status: "Success",
            message: "Cars data retrieved successfully.",
            isSuccess: true,
            data: Cars
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
};

const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const Car = await cars.findByPk(id);
        if(!Car){
            return res.status(404).json({
                status: "Failed",
                message: "Car not found.",
                isSuccess: false,
                data: null,
            })
        }
        res.status(200).json({
            status: "Success",
            message: "Cars data retrieved successfully by ID.",
            isSuccess: true,
            data: Car,
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
};

const createCar = async (req, res) => {
    try {
        const { name, model, desc } = req.body;
        if(!name || !model || !desc){
            return res.status(404).json({
                status: "Failed",
                message: "Please provide name, model, and desc.",
                isSuccess: false,
                data: null,
            });
        }
        const car = await cars.create({
            name,
            model,
            desc,
            createdBy: req.user.id,
            updatedBy: req.user.id,
        });

        res.status(200).json({
            status: "Success",
            message: "Car created successfully",
            isSuccess: true,
            data: car,
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
};

const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, model, desc } = req.body;
        const Car = await cars.findByPk(id);
        if(!Car){
            return res.status(404).json({
                status: "Failed",
                message: "Car not found",
                isSuccess: false,
                data: null,
            });
        }
        const updateCar = await Car.update({
            name,
            model,
            desc,
            updatedBy: req.user.id,
        })

        res.status(200).json({
            status: "Success",
            message: "Car updated successfully",
            isSuccess: true,
            data: updateCar,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const Car = await cars.findByPk(id);
        if(!Car){
            return res.status(404).json({
                status: "Failed",
                message: "Car not found",
                isSuccess: false,
            })
        }

        Car.deletedBy = req.user.id;
        await Car.destroy();
        res.status(200).json({
            status: "Success",
            message: "Car deleted successfully",
            isSuccess: true,
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
        });
    }
}

module.exports = {
    getAllCars,
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
}