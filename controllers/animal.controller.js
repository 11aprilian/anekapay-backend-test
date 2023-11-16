const { Sequelize } = require("sequelize");
const models = require("../models");
const { Animal } = models;

function handleError(res, error) {
  res.status(500).send({
    status: res.statusCode,
    message: error.message,
  });
}

module.exports = {
  getAllAnimal: async (req, res) => {
    try {
      const animals = await Animal.findAll();

      if (animals.length === 0) {
        return res.status(404).json({ message: "Data not found!" });
      }

      return res.json({
        message: "Data found!",
        data: animals,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  getAnimalByID: async (req, res) => {
    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id);

      if (!animal) {
        return res.status(404).json({ error: "Data not found!" });
      }

      return res.status(200).json({
        message: "Data found!",
        data: animal,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  addAnimal: async (req, res) => {
    try {
      const { name, class: animalClass, legs } = req.body;
      const sameAnimalName = await Animal.findOne({ where: { name } });

      if (sameAnimalName) {
        return res.status(400).json({ error: "Data already exists!" });
      }

      const animal = await Animal.create({ name, class: animalClass, legs });

      return res.status(201).json({
        message: "Data saved!",
        data: animal,
      });
    } catch (error) {
      handleError(res, error);
    }
  },

  deleteAnimalByID: async (req, res) => {
    try {
      const { id } = req.params;
      const existingAnimal = await Animal.findByPk(id);

      if (!existingAnimal) {
        return res.status(404).json({ error: "Data not found!" });
      }

      await existingAnimal.destroy();
      return res.json({ message: "Data deleted!" });
    } catch (error) {
      handleError(res, error);
    }
  },

  updateAnimalByID: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, class: animalClass, legs } = req.body;
      const existingAnimal = await Animal.findByPk(id);

      if (existingAnimal) {
        const duplicateAnimal = await Animal.findOne({
          where: { name, id: { [Sequelize.Op.not]: id } },
        });

        if (duplicateAnimal) {
          return res.status(400).json({ error: "Animal name already exists!" });
        }

        await existingAnimal.update({ name, class: animalClass, legs });
        return res.status(200).json({
          message: "Data updated!",
          data: existingAnimal,
        });
      }

      const sameAnimalName = await Animal.findOne({ where: { name } });

      if (sameAnimalName) {
        return res.status(400).json({ error: "Data already exists!" });
      }

      const animal = await Animal.create({
        id,
        name,
        class: animalClass,
        legs,
      });
      return res.status(201).json({
        message: "Data not registered, Save new data!",
        data: animal,
      });
    } catch (error) {
      handleError(res, error);
    }
  },
};
