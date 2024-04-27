import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controllers.js";

const router = Router();

//CONSULTAR LISTA DE USUARIOS
router.get("/users", getUsers);

//OBTENER USUARIO
router.get("/users/:id", getUser);

//AGREGAR USUARIO
router.post("/users", createUser);

//ELIMINAR USUARIO
router.delete("/users/:id", deleteUser);

//ACTUALIZAR USUARIO
router.put("/users/:id", updateUser);

export default router;
