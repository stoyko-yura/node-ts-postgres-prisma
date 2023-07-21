import { Request, Response } from "express";
import { prisma } from "../db";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (!users.length) {
      return res.status(404).json({
        success: false,
        mesasge: "Users not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched",
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        mesasge: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${user.id} fetched`,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    if (!newUser) {
      return res.status(404).json({
        success: false,
        mesasge: "User not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "User success created",
      user: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { email, name } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        email,
        name,
      },
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: `User ${userId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "User succses updated",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something was wrong",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    if (!deletedUser) {
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
