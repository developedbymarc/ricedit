import { Radius, Spacing, ThemeColor } from "@/constants/theme";
import { TReport, TVerdict } from "@/data/types";
import AppView from "@/components/ui/general/AppView";
import AppText from "@/components/ui/general/AppText";
import { StyleSheet } from "react-native";

const getVerdictColor = (verdict: TVerdict): ThemeColor => {
  switch (verdict) {
    case "worked":
      return "success";
    case "needed tweaks":
      return "warning";
    case "broke":
      return "danger";
  }
};

export type TReportItemProps = {
  report: TReport;
};

export default function ReportItem({ report }: TReportItemProps) {
  return (
    <AppView themeColor="backgroundElement" style={styles.item}>
      <AppText type="small" themeColor="textSecondary">
        {report.userName}
      </AppText>
      <AppText type="smallBold" themeColor={getVerdictColor(report.verdict)}>
        {report.verdict} on {report.distro}
      </AppText>
    </AppView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: Spacing.three,
    borderRadius: Radius.medium,
    gap: Spacing.half,
  },
});
