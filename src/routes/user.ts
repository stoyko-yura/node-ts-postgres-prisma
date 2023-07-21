import { Router } from "express";
import { userControllers } from "../controllers";

const router: Router = Router();

router.get("/", userControllers.getUsers);

router.get("/:userId", userControllers.getUser);

router.post("/", userControllers.postUser);

router.put("/:userId", userControllers.putUser);

router.delete("/:userId", userControllers.deleteUser);

export const userRouter = router;
