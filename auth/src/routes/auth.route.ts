import express from "express";

const router = express.Router();

router.get("/api/user/curent-user");

export { router as currentUserRouter };
