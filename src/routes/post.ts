import { Router } from "express";
import { postControllers } from "../controllers";

const router: Router = Router();

router.get("/", postControllers.getPosts);

router.get("/:postId", postControllers.getPost);

router.post("/", postControllers.postPost);

router.put("/:postId", postControllers.putPost);

router.delete("/:postId", postControllers.deletePost);

export const roleRouter = router;
