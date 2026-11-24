import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AppChipSelect from "@/components/ui/form/AppChipSelect";
import AppFormField from "@/components/ui/form/AppFormField";
import AppButton from "@/components/ui/general/AppButton";
import AppText from "@/components/ui/general/AppText";
import { Spacing } from "@/constants/theme";
import { DISTROS, VERDICTS } from "@/data/options";
import {
  getFieldErrors,
  reportSchema,
  type FieldErrors,
  type TReportValues,
} from "@/data/schemas";

type ReportFormProps = {
  defaultDistro: string;
  hasReported: boolean;
  onSubmit: (values: TReportValues) => void;
};

export default function ReportForm({
  defaultDistro,
  hasReported,
  onSubmit,
}: ReportFormProps) {
  const [verdict, setVerdict] = useState("");
  const [distro, setDistro] = useState(defaultDistro);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit() {
    const result = reportSchema.safeParse({ verdict, distro, note });
    if (!result.success) {
      setErrors(getFieldErrors(result.error));
      return;
    }

    setErrors({});
    onSubmit(result.data);
    setVerdict("");
    setNote("");
  }

  return (
    <View style={styles.form}>
      <AppText type="smallBold">
        {hasReported ? "Update your report" : "Add a compatibility report"}
      </AppText>

      <AppChipSelect
        label="Verdict"
        options={VERDICTS}
        selected={verdict}
        onChange={setVerdict}
        error={errors.verdict}
      />
      <AppChipSelect
        label="Your distro"
        options={DISTROS}
        selected={distro}
        onChange={setDistro}
        error={errors.distro}
      />
      {/* add notes maybe here in the future? */}

      <AppButton
        content={{
          text: hasReported ? "Update report" : "Submit report",
          icon: undefined,
          order: ["text", "icon"],
        }}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: Spacing.three },
});
