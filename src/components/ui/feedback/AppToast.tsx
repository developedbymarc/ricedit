import { StyleSheet } from "react-native";
import AppView from "@/components/ui/general/AppView";
import AppText from "@/components/ui/general/AppText";
import AppButton, { TAppButtonProps } from "@/components/ui/general/AppButton";
import { Radius, Spacing } from "@/constants/theme";

type TToastAction = {
  actionContent: TAppButtonProps["content"];
  onAction: () => void;
}

export type TToastProps = {
  title: string;
  message?: string;
  isError?: boolean;
  actions: TToastAction[];
};

export default function AppToast({
  title,
  message,
  isError = false,
  actions
}: TToastProps) {
  return (
    <AppView themeColor="backgroundElement">
      <AppText themeColor={isError ? "danger" : "text"} style={styles.title}>
        {title}
      </AppText>
      {message && (
        <AppText type="small" themeColor="textSecondary" style={styles.centerText}>
          {message}
        </AppText>
      )}
      {actions.map(({ actionContent, onAction }) => (
        <AppButton content={actionContent} onPress={onAction} />
      ))}
    </AppView>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: Spacing.five,
    borderRadius: Radius.large,
    alignItems: "center",
    gap: Spacing.two,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  centerText: { textAlign: "center" },
  action: { alignSelf: "stretch", marginBlockStart: Spacing.two },
});
