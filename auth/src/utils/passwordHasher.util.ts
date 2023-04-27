import bcryptjs from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isPasswordMatch = await bcryptjs.compare(password, hashedPassword);
  return isPasswordMatch;
};
