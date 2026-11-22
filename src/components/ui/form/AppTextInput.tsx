import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

export type TAppTextInputProps = TextInputProps;

export default function AppTextInput({
  style,
  ...inputProps
}: TAppTextInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      placeholderTextColor={theme.textSecondary}
      {...inputProps}
      style={[
        styles.input,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.border,
          color: theme.text,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: 1,
    fontSize: 16,
  },
});
