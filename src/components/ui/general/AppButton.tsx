import { Radius, Spacing, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import {
  Ionicons,
  IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import AppText from "@/components/ui/general/AppText";

type TButtonVariant = "primary" | "secondary" | "danger";

export type TAppButtonProps = Omit<PressableProps, "children" | "style"> & {
  content: {
    text?: string;
    icon?: IoniconsIconName;
    order: ["text", "icon"] | ["icon", "text"];
  };
  variant?: TButtonVariant;
  style?: StyleProp<ViewStyle>;
};

export default function AppButton({
  content,
  variant = "primary",
  style,
  ...pressableProps
}: TAppButtonProps) {
  const theme = useTheme();

  let backgroundColor: string = theme.accent;
  let borderColor: string = theme.accent;
  let textColor: ThemeColor = "accentForeground";

  if (variant === "secondary") {
    backgroundColor = theme.backgroundElement;
    borderColor = theme.border;
    textColor = "text";
  }

  if (variant === "danger") {
    backgroundColor = theme.danger;
    borderColor = theme.danger;
    textColor = "accentForeground";
  }

  return (
    <Pressable
      accessibilityRole="button"
      {...pressableProps}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, borderColor },
        pressed && styles.pressed,
        pressableProps.disabled && styles.disabled,
        style,
      ]}
    >
      {content.order.map((e) => {
        switch (e) {
          case "text":
            return (
              content.text && (
                <AppText themeColor={textColor} style={styles.text}>
                  {content.text}
                </AppText>
              )
            );
          case "icon":
            return content.icon && <Ionicons name={content.icon} />;
        }
      })}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
    filter: "saturation(0.5)",
  },
});
