export const Query = {
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findFirst({
      where: {
        email: userInfo.email,
      },
    });
  },
  profile: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },
  users: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findMany();
    return user;
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return posts;
  },
};
