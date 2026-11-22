import { TActionResult, TUser } from "@/data/types";
import * as storage from "@/lib/utils/storage";

export const updateProfile = async (userName?: string, bio?: string): Promise<TActionResult<TUser, "You must be logged in to update your profile" | "User not found">> => {
  const { users, currentUserId } = await storage.loadAppData();
  if (currentUserId === null) {
    return { success: false, error: "You must be logged in to update your profile" };
  }

  const user = users.find(u => u.id === currentUserId);
  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (userName !== undefined) {
    user.userName = userName;
  }
  if (bio !== undefined) {
    user.bio = bio;
  }

  await storage.saveData<"users">("users", users);
  return { success: true, data: user };
}

export const getUserName = async (userId: string): Promise<TActionResult<string, "User not found">> => {
  const { users } = await storage.loadAppData();
  const user = users.find(u => u.id === userId);
  if (!user) {
    return { success: false, error: "User not found" };
  }

  return { success: true, data: user.userName };
}
