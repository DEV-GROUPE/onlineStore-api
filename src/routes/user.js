import express from "express";

import {
    loginUser,
    signupUser,
    getUsers,
    addUser,
    getMyProfile,
    deleteMyProfile,
    updateMyProfile,
} from "../controllers/userController.js";

const router = express.Router();

// login/register
router.post("/login", loginUser);
router.post("/signup", signupUser);

// add
router.post("/", addUser);

// get all users
router.get("/users", getUsers);
// get user
router.get("/", getMyProfile);
// update
router.patch("/", updateMyProfile);
// delete
router.delete("/", deleteMyProfile);

export default router;
