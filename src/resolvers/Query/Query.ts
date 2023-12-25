
export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findMany();
    return user;
  },
};
