import { checkUserAccess } from "../../utils/checkUserAccess";

export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized Access",
        post: null,
      };
    }
    const user = await prisma.user.findFirst({
      where: {
        email: userInfo.email,
      },
    });

    if (!post.title || !post.content) {
      return {
        userError: "Title and Content is required",
        post: null,
      };
    }
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: user.id,
      },
    });
    return {
      userError: null,
      post: newPost,
    };
  },
  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized Access",
        post: null,
      };
    }
    const error = await checkUserAccess(prisma, userInfo.email, args.postId);
    if (error) {
      return error;
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
  publishPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized Access",
        post: null,
      };
    }
    const error = await checkUserAccess(prisma, userInfo.email, args.postId);
    if (error) {
      return error;
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized Access",
        post: null,
      };
    }
    const error = await checkUserAccess(prisma, userInfo.email, args.postId);
    if (error) {
      return error;
    }
    const deletePost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });

    return {
      userError: null,
      post: deletePost,
    };
  },
};
