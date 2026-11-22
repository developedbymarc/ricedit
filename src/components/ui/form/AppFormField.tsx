import { StyleSheet, View, type TextInputProps } from "react-native";
import AppTextInput from "@/components/ui/form/AppTextInput";
import AppText from "@/components/ui/general/AppText";
import { Spacing } from "@/constants/theme";

export type TAppFormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function FormField({
  label,
  error,
  ...inputProps
}: TAppFormFieldProps) {
  return (
    <View style={styles.field}>
      <AppText type="smallBold">{label}</AppText>
      <AppTextInput {...inputProps} />
      {error && (
        <AppText type="small" themeColor="danger">
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: Spacing.one },
});
