import { VERDICTS } from "@/data/options";
import { TDesktopWM, TDistro, TSetup, TShell, TTerminal, TActionResult, TVerdict, TReport } from "@/data/types";

export const filterSetups = (
  setups: TSetup[],
  searchText: string,
  distro: TDistro,
  dewm: TDesktopWM,
  shell: TShell,
  terminal: TTerminal
): TActionResult<TSetup[]> => {
  const query = searchText.trim().toLowerCase();

  const filtered = setups.filter(setup => {
    if (String(distro) !== "Any" && setup.distro !== distro) return false;
    if (String(dewm) !== "Any" && setup.dewm !== dewm) return false;
    if (String(shell) !== "Any" && setup.shell !== shell) return false;
    if (String(terminal) !== "Any" && setup.terminal !== terminal) return false;
    if (query.length === 0) return false;

    const searchableText = [
      setup.title,
      setup.description,
      setup.distro,
      setup.dewm,
      setup.shell,
      setup.terminal
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  return { success: true, data: filtered }
}

type TReportSummaryDto = Record<TVerdict, number>;
export const summarizeReports = (reports: TReport[]): TActionResult<TReportSummaryDto> => {
  const summary: TReportSummaryDto = {
    "worked": 0,
    "needed tweaks": 0,
    "broke": 0
  };
  if (reports.length === 0) return { success: true, data: summary }

  for (const verdict of VERDICTS) {
    const count = reports.filter(report => report.verdict === verdict).length;
    summary[verdict] = count;
  }

  return { success: true, data: summary }
}
