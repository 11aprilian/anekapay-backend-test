const express = require("express");
const router = express.Router();

const {
  getAllAnimal,
  getAnimalByID,
  addAnimal,
  deleteAnimalByID,
  updateAnimalByID,
} = require("../controllers/animal.controller");

router.get("/", getAllAnimal);
router.get("/:id", getAnimalByID);
router.post("/add", addAnimal);
router.delete("/:id", deleteAnimalByID);
router.put("/:id", updateAnimalByID);

module.exports = router;
