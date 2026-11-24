import { TSetup } from "@/data/types";
import { useTheme } from "@/hooks/useTheme";
import { Image, Pressable, StyleSheet } from "react-native";
import AppView from "@/components/ui/general/AppView";
import { Radius, Spacing } from "@/constants/theme";
import AppText from "@/components/ui/general/AppText";

export type TSetupCardProps = {
  setup: TSetup;
  ownerName: string;
  onOpen: (setup: TSetup) => void;
};

export default function SetupCard({ setup, ownerName, onOpen }: TSetupCardProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={() => { onOpen(setup) }} accessibilityRole="button">
      <AppView themeColor="backgroundElement" style={[
        styles.card,
        { borderColor: theme.border }
      ]}>
        <AppText style={styles.title}>{setup.title}</AppText>
        <AppText type="code" themeColor="textSecondary">
          { [setup.distro, setup.dewm, setup.shell, setup.terminal].join(" / ")}
        </AppText>
        <Image
          source={{ uri: "https://unsplash.it/800/450" }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <AppText type="small" numberOfLines={2}>
          {setup.description}
        </AppText>
        <AppText type="small" themeColor="textSecondary">
          by {ownerName}
        </AppText>
      </AppView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.four,
    borderRadius: Radius.large,
    borderWidth: 1,
    gap: Spacing.one,
  },
  thumbnail: {
    width: 200,
    height: 115
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700"
  }
})
