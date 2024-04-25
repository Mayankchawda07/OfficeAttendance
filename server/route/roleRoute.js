const express = require('express')
const { addRoles, getAllRoles, getSingleRoles, updateRolesById } = require('../controller/roleController')
const roleRoutes = express.Router();

roleRoutes.post("/AddRoles", addRoles);
roleRoutes.put("/updateRolesById/:id", updateRolesById);
roleRoutes.get("/getSingleRoles/:id", getSingleRoles);
roleRoutes.get("/getAllRoles", getAllRoles);

module.exports = roleRoutes;