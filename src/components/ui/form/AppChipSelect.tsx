import { Radius, Spacing } from "@/constants/theme";
import AppText from "@/components/ui/general/AppText";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type TAppChipSelectProps<T extends string> = {
  label?: string;
  options: readonly T[];
  selected: string;
  onChange: (value: T) => void;
  error?: string;
};

export default function AppChipSelect<T extends string>({
  label,
  options,
  selected,
  onChange,
  error,
}: TAppChipSelectProps<T>) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      {label && <AppText type="smallBold">{label}</AppText>}

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.row}
        style={styles.scroll}
      >
        {options.map((option) => {
          const isSelected = option === selected;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              style={[
                styles.chip,
                {
                  borderColor: theme.border,
                  backgroundColor: isSelected
                    ? theme.backgroundSelected
                    : theme.backgroundElement,
                },
              ]}
            >
              <AppText
                type="small"
                themeColor={isSelected ? "accentForeground" : "text"}
              >
                {option}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.one },
  scroll: { flexGrow: 0 },
  row: { gap: Spacing.two },
  chip: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
});
