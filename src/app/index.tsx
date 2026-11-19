import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '@/components/ui/general/AppText';
import AppView from '@/components/ui/general/AppView';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <AppView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <AppView style={styles.heroSection}>
          <Image
            source={require("@/assets/images/ricedit-wave.png")}
            style={styles.mascot}
            resizeMode="contain"
            accessibilityLabel="Ricedit penguin mascot waving"
          />
        </AppView>

        <AppText type="code" style={styles.code}>
          get started
        </AppText>
      </SafeAreaView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  mascot: {
    width: 240,
    height: 240,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
