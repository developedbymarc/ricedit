import { VERDICTS } from "@/data/options";
import { TDesktopWM, TDistro, TSetup, TShell, TTerminal, TActionResult, TVerdict, TReport, TQueueEntry, TQueueStatus } from "@/data/types";
import * as storage from "@/lib/utils/storage"

export const filterSetups = async (
  searchText: string,
  distro: TDistro,
  dewm: TDesktopWM,
  shell: TShell,
  terminal: TTerminal
): Promise<TActionResult<TSetup[], "Failed to fetch setups">> => {
  const { setups } = await storage.loadAppData();
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
export const summarizeReports = async (): Promise<TActionResult<TReportSummaryDto, undefined>> => {
  const { reports } = await storage.loadAppData();
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

export const addSetup = async (
  title: string,
  description: string,
  repoUrl: string,
  distro: TDistro = "Other",
  dewm: TDesktopWM = "Other",
  shell: TShell = "Other",
  terminal: TTerminal = "Other",
): Promise<TActionResult<"Setup added successfully", "Failed to add setup">> => {
  const appData = await storage.loadAppData();
  if (appData.currentUserId === null) {
    return { success: false, error: "Failed to add setup" };
  }

  const newSetup: TSetup = {
    id: storage.uuid(),
    ownerId: appData.currentUserId,
    title,
    description,
    repoUrl,
    distro,
    dewm,
    shell,
    terminal
  };

  appData.setups.push(newSetup);
  await storage.saveAppData(appData);

  return { success: true, data: "Setup added successfully" };
}

export const updateSetup = async (
  setupId: string,
  title?: string,
  description?: string,
  repoUrl?: string,
  distro?: TDistro,
  dewm?: TDesktopWM,
  shell?: TShell,
  terminal?: TTerminal): Promise<TActionResult<"Setup updated successfully", "Failed to update setup">> => {
  const appData = await storage.loadAppData();
  if (appData.currentUserId === null) {
    return { success: false, error: "Failed to update setup" };
  }

  const setup = appData.setups.find(s => s.id === setupId);
  if (!setup) {
    return { success: false, error: "Failed to update setup" };
  }

  if (setup.ownerId !== appData.currentUserId) {
    return { success: false, error: "Failed to update setup" };
  }

  if (title !== undefined) setup.title = title;
  if (description !== undefined) setup.description = description;
  if (repoUrl !== undefined) setup.repoUrl = repoUrl;
  if (distro !== undefined) setup.distro = distro;
  if (dewm !== undefined) setup.dewm = dewm;
  if (shell !== undefined) setup.shell = shell;
  if (terminal !== undefined) setup.terminal = terminal;

  await storage.saveAppData(appData);

  return { success: true, data: "Setup updated successfully" };
}

export const deleteSetup = async (setupId: string): Promise<TActionResult<"Setup deleted successfully", "Failed to delete setup">> => {
  const appData = await storage.loadAppData();
  if (appData.currentUserId === null) {
    return { success: false, error: "Failed to delete setup" };
  }

  const setup = appData.setups.find(s => s.id === setupId);
  if (!setup) {
    return { success: false, error: "Failed to delete setup" };
  }

  if (setup.ownerId !== appData.currentUserId) {
    return { success: false, error: "Failed to delete setup" };
  }

  appData.setups = appData.setups.filter(s => s.id !== setupId);
  await storage.saveAppData(appData);

  return { success: true, data: "Setup deleted successfully" };
}

export const getQueueEntry = async (setupId: string): Promise<TActionResult<TReport | null, "Failed to fetch queue entry">> => {
  const appData = await storage.loadAppData();
  if (appData.currentUserId === null) {
    return { success: false, error: "Failed to fetch queue entry" };
  }

  const queueEntry = appData.queue.find(q => q.setupId === setupId && q.userId === appData.currentUserId);
  if (!queueEntry) {
    return { success: true, data: null };
  }

  const report = appData.reports.find(r => r.setupId === setupId && r.userId === appData.currentUserId);
  if (!report) {
    return { success: true, data: null };
  }

  return { success: true, data: report };
}

export const saveToQueue = async (
  setupId: string,
  status: TQueueStatus): Promise<TActionResult<"Queue entry saved successfully", "Failed to save queue entry">> => {
  const appData = await storage.loadAppData();
  if (appData.currentUserId === null) {
    return { success: false, error: "Failed to save queue entry" };
  }

  const existingEntry = appData.queue.find(q => q.setupId === setupId && q.userId === appData.currentUserId);
  if (!existingEntry) {
    const newEntry: TQueueEntry = {
      userId: appData.currentUserId,
      setupId,
      status
    };
    appData.queue.push(newEntry);
  } else {
    existingEntry.status = status;
  }

  await storage.saveAppData(appData);

  return { success: true, data: "Queue entry saved successfully" };
}

export const changeQueueStatus = async (
  setupId: string,
  status: TQueueStatus): Promise<TActionResult<"Queue status changed successfully", "Failed to change queue status">> => {
  const appData = await storage.loadAppData();
  if (appData.currentUserId === null) {
    return { success: false, error: "Failed to change queue status" };
  }

  const existingEntry = appData.queue.find(q => q.setupId === setupId && q.userId === appData.currentUserId);
  if (!existingEntry) {
    return { success: false, error: "Failed to change queue status" };
  }

  existingEntry.status = status;
  await storage.saveAppData(appData);

  return { success: true, data: "Queue status changed successfully" };
}

export const removeFromQueue = async (setupId: string): Promise<TActionResult<"Removed from queue successfully", "Failed to remove from queue">> => {
  const appData = await storage.loadAppData();
  if (appData.currentUserId === null) {
    return { success: false, error: "Failed to remove from queue" };
  }

  const existingEntryIndex = appData.queue.findIndex(q => q.setupId === setupId && q.userId === appData.currentUserId);
  if (existingEntryIndex === -1) {
    return { success: false, error: "Failed to remove from queue" };
  }

  appData.queue.splice(existingEntryIndex, 1);
  await storage.saveAppData(appData);

  return { success: true, data: "Removed from queue successfully" };
}

export const getReportsForSetup = async (setupId: string): Promise<TActionResult<TReport[], "Failed to fetch reports">> => {
  const { reports } = await storage.loadAppData();
  const setupReports = reports.filter(r => r.setupId === setupId);
  return { success: true, data: setupReports };
}

export const addReport = async (
  setupId: string,
  distro: TDistro,
  verdict: TVerdict
): Promise<TActionResult<"Report added successfully", "Failed to add report">> => {
  const appData = await storage.loadAppData();
  if (appData.currentUserId === null) {
    return { success: false, error: "Failed to add report" };
  }

  const user = appData.users.find(u => u.id === appData.currentUserId);
  if (!user) {
    return { success: false, error: "Failed to add report" };
  }

  const newReport: TReport = {
    id: storage.uuid(),
    setupId,
    userId: appData.currentUserId,
    userName: user.userName,
    distro,
    verdict
  };

  appData.reports.push(newReport);
  await storage.saveAppData(appData);

  return { success: true, data: "Report added successfully" };
}
