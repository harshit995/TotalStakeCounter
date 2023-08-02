const express = require("express")
const router = express.Router();
const controllers = require("../controllers/usersControllers");

router.get("/chain/:chainName", controllers.getChain)
router.get("/chains", controllers.getAllChains)
router.post("/chains", controllers.getpostedChains)
router.delete("/chains/:chainName", controllers.getdeletedChains)

module.exports = router