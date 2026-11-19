import * as z from "zod";

export type FieldErrors = Record<string, string | undefined>;
type IssueLike = { path: PropertyKey[]; message: string };

// === Account Schemas === //
export const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Use at least 6 characters for the password."),
});
export type TSignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z.email("Enter a valid email address."),
    password: z.string().min(6, "Use at least 6 characters for the password."),
    confirmPassword: z.string(),
  })
  .refine((values) => {
    return values.password === values.confirmPassword;
  }, { message: "Passwords do not match.", path: ["confirmPassword"] });
export type TSignUpValues = z.infer<typeof signUpSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    newPassword: z.string().min(6, "Use at least 6 characters for the new password."),
    confirmPassword: z.string(),
  })
  .refine((values) => {
    return values.newPassword === values.confirmPassword;
  }, { message: "Passwords do not match.", path: ["confirmPassword"] });
export type TChangePasswordValues = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Use at least 6 characters for the new password."),
    confirmPassword: z.string(),
  })
  .refine((values) => {
    return values.newPassword === values.confirmPassword;
  }, { message: "Passwords do not match.", path: ["confirmPassword"] });
export type TForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  distro: z.string().min(1, "Choose your distro."),
  bio: z.string().trim().max(120, "Keep the bio under 120 characters."),
});
export type TProfileValues = z.infer<typeof profileSchema>;

// === Setups === //
export const setupSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(60, "Title must be 60 characters or fewer."),
  distro: z.string().min(1, "Choose a distro."),
  dewm: z.string().min(1, "Choose a DE/WM."),
  shell: z.string().min(1, "Choose a shell."),
  terminal: z.string().trim().min(1, "Enter the terminal you use."),
  description: z.string().trim().min(10, "Describe the setup in at least 10 characters.").max(300, "Keep the description under 300 characters."),
  repoUrl: z.httpUrl("Enter a link that starts with http:// or https://.").trim(),
});
export type TSetupValues = z.infer<typeof setupSchema>;

export const reportSchema = z.object({
  distro: z.string().min(1, "Choose your distro."),
  verdict: z.string().min(1, "Choose a verdict."),
});
export type TReportValues = z.infer<typeof reportSchema>;

// turns result.error into { fieldName: "error message" }
export function getFieldErrors(error: { issues: IssueLike[] }): FieldErrors {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    if (issue.path.length === 0) continue;
    const fieldName = String(issue.path[0]);
    if (fieldErrors[fieldName] === undefined) {
      fieldErrors[fieldName] = issue.message;
    }
  }
  return fieldErrors;
}
