import express from "express";
import { createUser } from "../controller/user.controller.js";

const router = express.Router();

// Define the route for creating a user
router.post("/users", createUser);

export default router;
