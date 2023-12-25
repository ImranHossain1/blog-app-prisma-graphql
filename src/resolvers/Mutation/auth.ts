import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}
export const authResolvers = {
  signup: async (parent: any, args: userInfo, { prisma }: any) => {
    const isExists = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (!!isExists) {
      return {
        userError: "User Already Exists",
        token: null,
      };
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }
    const token = jwtHelper.generateToken(
      { email: newUser.email },
      config.jwt.secret as string
    );
    return {
      userError: null,
      token: token,
    };
  },
  signIn: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (!user) {
      return {
        token: null,
        userError: "User Not Found",
      };
    }
    const correctPassword = await bcrypt.compare(args.password, user.password);
    if (!correctPassword) {
      return { token: null, userError: "Incorrect Password" };
    }
    const token = jwtHelper.generateToken(
      { email: user.email },
      config.jwt.secret as string
    );
    return {
      token: token,
      userError: null,
    };
  },
};
