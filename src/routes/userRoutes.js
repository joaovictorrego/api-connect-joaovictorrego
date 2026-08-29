import { Router } from "express";

import {
  
  createUser,
  
  deleteUser,
  
  getUserById,
  
  listUsers,
  
  updateUser
  
} from "../controllers/userController.js";



const router = Router();



router.get("/", listUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/", createUser);



export default router;







