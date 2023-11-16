const { Sequelize } = require("sequelize");
const models = require("../models");
const { Animal } = models;

module.exports = {
  getAllAnimal: async (req, res) => {
    try {
      const animals = await Animal.findAll();

      if (animals == 0) {
        res.status(404).json({
          message: "Data not found!",
        });
      } else {
        res.json({
          message: "Data found!",
          data: animals,
        });
      }
    } catch (error) {
      res.status(500).send({
        status: res.statusCode,
        message: error.message,
      });
    }
  },

  getAnimalByID: async (req, res) => {
    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id);

      if (animal) {
        res.status(200).json({
          message: "Data found!",
          data: animal,
        });
      } else {
        res.status(404).json({ error: "Data not found!" });
      }
    } catch (error) {
      res.status(500).send({
        status: res.statusCode,
        message: error.message,
      });
    }
  },

  addAnimal: async (req, res) => {
    try {
      const { name } = req.body;
      const sameAnimalName = await Animal.findOne({ where: { name } });

      if (sameAnimalName) {
        res.status(400).json({
          error: "Data already exist!",
        });
      } else {
        const animal = await Animal.create({
          name: req.body.name,
          class: req.body.class,
          legs: req.body.legs,
        });
        res.status(201).json({
          message: "Data saved!",
          data: animal,
        });
      }
    } catch (error) {
      res.status(500).send({
        status: res.statusCode,
        message: error.message,
      });
    }
  },

  deleteAnimalByID: async (req, res) => {
    try {
      const { id } = req.params;
      const existingAnimal = await Animal.findByPk(id);

      if (existingAnimal) {
        await existingAnimal.destroy();
        res.json({ message: "Data deleted!" });
      } else {
        res.status(404).json({ error: "Data not found!" });
      }
    } catch (error) {
      res.status(500).send({
        status: res.statusCode,
        message: error.message,
      });
    }
  },

  updateAnimalByID: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const existingAnimal = await Animal.findByPk(id);

      if (existingAnimal) {
        const duplicateAnimal = await Animal.findOne({
          where: { name, id: { [Sequelize.Op.not]: id } },
        });

        if (duplicateAnimal) {
          res.status(400).json({ error: "Animal name already exist!" });
        } else {
          await existingAnimal.update({
            name: req.body.name,
            class: req.body.class,
            legs: req.body.legs,
          });
          res.status(200).json({
            message: "Data updated!",
            data: existingAnimal,
          });
        }
      } else {
        const sameAnimalName = await Animal.findOne({ where: { name } });

        if (sameAnimalName) {
          res.status(400).json({
            error: "Data already exist!",
          });
        } else {
          const animal = await Animal.create({
            id: id,
            name: req.body.name,
            class: req.body.class,
            legs: req.body.legs,
          });
          res.status(201).json({
            message: "Data saved!",
            data: animal,
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        status: res.statusCode,
        message: error.message,
      });
    }
  },
};
