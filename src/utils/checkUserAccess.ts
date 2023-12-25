export const checkUserAccess = async (
  prisma: any,
  email: string,
  postId: string
) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    return {
      userError: "User Not Found",
      post: null,
    };
  }

  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });

  if (!post) {
    return {
      userError: "Post Not Found",
      post: null,
    };
  }

  if (post.authorId !== user.id) {
    return {
      userError: "Post is not owned by user",
      post: null,
    };
  }
};
