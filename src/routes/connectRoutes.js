import { Router } from "express";
import {
  getConnectionById,
  listConnections
} from "../controllers/connectController.js";

const router = Router();

router.get("/", listConnections);
router.get("/:id", getConnectionById);

export default router;
