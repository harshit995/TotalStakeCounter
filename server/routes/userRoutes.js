const express = require("express")
const router = express.Router();
const controllers = require("../controllers/usersControllers");

router.get("/", controllers.gethome)