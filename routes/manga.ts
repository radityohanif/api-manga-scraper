import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, slug, description, genre, thumbnail } = req.body;
    const manga = await prisma.manga.create({
      data: {
        title,
        slug,
        description,
        genre,
        thumbnail,
      },
    });
    res.status(201).json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const mangaList = await prisma.manga.findMany();
    res.json(mangaList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const mangaId = parseInt(req.params.id, 10);
    const { title, slug, description, genre, thumbnail } = req.body;

    const updatedManga = await prisma.manga.update({
      where: { id: mangaId },
      data: {
        title,
        slug,
        description,
        genre,
        thumbnail,
      },
    });

    res.json(updatedManga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const mangaId = parseInt(req.params.id, 10);

    await prisma.manga.delete({
      where: { id: mangaId },
    });

    res.json({ message: "Manga deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
