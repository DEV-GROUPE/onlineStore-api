import { body } from "express-validator";
import { USER_ROLES } from "../../utils/userRoles.js";
import User from "../../models/user.model.js";

export const validateUsername = () =>
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .bail()
        .isAlphanumeric()
        .withMessage("Username must contain only letters and numbers.")
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3 and 30 characters.")
        .bail()
        .custom(async (username) => {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error("Username is already in use");
            }
            return true;
        });

export const validateEmail = () =>
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .bail()
        .isEmail()
        .withMessage("Email must be a valid email address.")
        .bail()
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("Email is already in use");
            }
            return true;
        });

export const validatePassword = () =>
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.");

export const validateRole = () =>
    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required.")
        .bail()
        .isIn(Object.values(USER_ROLES))
        .withMessage(
            `Role must be one of the following: ${Object.values(
                USER_ROLES
            ).join(", ")}.`
        );
