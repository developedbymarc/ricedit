import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

export type TAppViewProps = ViewProps & {
  themeColor?: ThemeColor;
};

export default function AppView({ style, themeColor, ...otherProps }: TAppViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[themeColor ?? 'background'] }, style]} {...otherProps} />;
}
