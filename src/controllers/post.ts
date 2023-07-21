import { Request, Response } from "express";
import { prisma } from "../db";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();

    if (!posts.length) {
      return res.status(404).json({
        success: false,
        message: "Posts not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Posts fetched",
      posts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Post ${post.id} fetched`,
      post,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};

export const postPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });

    if (!newPost) {
      return res.status(404).json({
        success: false,
        message: "Post not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post success created",
      post: newPost,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};

export const putPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, content, published } = req.body;

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title,
        content,
        published,
      },
    });

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: `Post ${postId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Post succses updated",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post success deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};
