import { TActionResult, TUser } from "@/data/types";
import * as storage from "../utils/storage";
import {
  changePasswordSchema,
  FieldErrors,
  forgotPasswordSchema,
  getFieldErrors,
  signUpSchema,
} from "@/data/schemas";

/**
 * @param email
 * @param password
 * @returns
 */
export const signIn = async (
  email: string,
  password: string,
): Promise<TActionResult<string, "Email or password incorrect">> => {
  const { users } = await storage.loadAppData();

  const normalizedEmail = email.trim().toLowerCase();
  const found = users.find(
    (user) =>
      user.email.toLowerCase() === normalizedEmail &&
      user.password === password,
  );
  if (found === undefined)
    return { success: false, error: "Email or password incorrect" };

  return { success: true, data: found.id };
};

export const signUp = async (
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
): Promise<TActionResult<"Signed up successfully", "Bad Request">> => {
  const { users } = await storage.loadAppData();

  const parsed = signUpSchema.safeParse({
    userName,
    email,
    password,
    confirmPassword,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Bad Request",
    };
  }

  const user: TUser = {
    id: storage.uuid(),
    userName: parsed.data.userName,
    email: parsed.data.email,
    password: parsed.data.password,
    bio: "",
  };

  users.push(user);
  await storage.saveData<"users">("users", users);

  return { success: true, data: "Signed up successfully" };
};

export const logout = async (): Promise<
  TActionResult<"Logged out successfully", "Not logged in">
> => {
  const { currentUserId } = await storage.loadAppData();
  if (currentUserId === null) return { success: false, error: "Not logged in" };

  await storage.saveData<"currentUserId">("currentUserId", null);
  return { success: true, data: "Logged out successfully" };
};

export const resetPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
): Promise<TActionResult<"Password reset successfully", string | FieldErrors>> => {
  const { users } = await storage.loadAppData();

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return {
      success: false,
      error: "Email or password incorrect",
    };
  }

  if (user.password !== currentPassword) {
    return {
      success: false,
      error: "Email or password incorrect",
    };
  }

  const parsed = changePasswordSchema.safeParse({
    currentPassword: currentPassword,
    newPassword,
    confirmPassword: confirmNewPassword,
  });

  if (!parsed.success) {
    const errors: FieldErrors = getFieldErrors(parsed.error);
    return {
      success: false,
      error: errors,
    };
  }

  user.password = newPassword;
  await storage.saveData<"users">("users", users);

  return { success: true, data: "Password reset successfully" };
};

export const resetForgottenPassword = async (
  email: string,
  newPassword: string,
  confirmNewPassword: string,
): Promise<TActionResult<"Password reset successfully", FieldErrors>> => {
  const { users } = await storage.loadAppData();

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return {
      success: false,
      error: { email: "Email not found" },
    };
  }

  const parsed = forgotPasswordSchema.safeParse({
    newPassword,
    confirmPassword: confirmNewPassword,
  });

  if (!parsed.success) {
    const errors: FieldErrors = getFieldErrors(parsed.error);
    return {
      success: false,
      error: errors,
    };
  }

  user.password = newPassword;
  await storage.saveData<"users">("users", users);

  return { success: true, data: "Password reset successfully" };
};
