import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import * as mockData from "@/data/mockData";
import type {
  TProfileValues,
  TReportValues,
  TSetupValues,
  TSignInValues,
  TSignUpValues,
} from "@/data/schemas";
import type {
  TActionResult,
  TAppData,
  TDesktopWM,
  TDistro,
  TQueueEntry,
  TQueueStatus,
  TReport,
  TSetup,
  TShell,
  TTerminal,
  TUser,
  TVerdict,
} from "@/data/types";

import * as storage from "@/lib/utils/storage";
import * as authApi from "@/lib/api/auth";
import * as profileApi from "@/lib/api/profile";
import * as setupApi from "@/lib/api/setup";

export type TQueuedSetup = { setup: TSetup; status: TQueueStatus };

type TAppContext = {
  // loading + errors
  isLoading: boolean;
  loadError: string[];
  saveError: string[];
  retryLoad: () => void;
  dismissSaveError: () => void;

  // user session
  user: TUser | null;
  hasSeenWalkthrough: boolean; // cache it in context to avoid loading AsyncStorage every time
  markWalkthroughSeen: () => void;
  signUp: typeof authApi.signUp;
  signIn: typeof authApi.signIn;
  logout: typeof authApi.logout;
  resetPassword: typeof authApi.resetPassword;
  resetForgottenPassword: typeof authApi.resetForgottenPassword;
  updateProfile: typeof profileApi.updateProfile;

  // user's queue
  queuedSetups: TQueuedSetup[];
  getQueueEntry: typeof setupApi.getQueueEntry;
  saveToQueue: typeof setupApi.saveToQueue;
  changeQueueStatus: typeof setupApi.changeQueueStatus;
  removeFromQueue: typeof setupApi.removeFromQueue;

  // users
  getUserName: typeof profileApi.getUserName;

  // setups
  setups: TSetup[];
  addSetup: typeof setupApi.addSetup;
  updateSetup: typeof setupApi.updateSetup;
  deleteSetup: typeof setupApi.deleteSetup;
  getReportsForSetup: typeof setupApi.getReportsForSetup;
  addReport: typeof setupApi.addReport;

  // demo
  resetDemoData: () => Promise<TActionResult<string, never>>;
};

const AppContext = createContext<TAppContext | null>(null);

export function useApp(): TAppContext {
  const value = useContext(AppContext);
  if (value === null) {
    throw new Error("useApp must be used inside its context provider");
  }

  return value;
}

type AppProviderProps = { children: ReactNode };

export default function AppProvider({ children }: AppProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [reloadCount, setReloadCount] = useState(0);
  const [loadError, setLoadError] = useState<string[]>([]);
  const [saveError, setSaveError] = useState<string[]>([]);

  const [users, setUsers] = useState<TUser[]>([]);
  const [setups, setSetups] = useState<TSetup[]>([]);
  const [queue, setQueue] = useState<TQueueEntry[]>([]);
  const [reports, setReports] = useState<TReport[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState(false);

  const applyData = (data: TAppData) => {
    setUsers(data.users);
    setSetups(data.setups);
    setQueue(data.queue);
    setReports(data.reports);
    setCurrentUserId(data.currentUserId);
    setHasSeenWalkthrough(data.hasSeenWalkthrough);
  };

  useEffect(() => {
    let isCancelled = false;

    const loadData = async () => {
      try {
        const data = await storage.loadAppData();
        if (isCancelled === false)
          applyData(data);
      } catch {
        if (isCancelled === false)
          setLoadError(["Could not load your data. Please try again."]);
      } finally {
        if (isCancelled === false)
          setIsLoading(false);
      }
    };

    loadData();
    return () => { isCancelled = true; }
  }, [reloadCount]);

  const refresh = async () => {
    applyData(await storage.loadAppData());
  }

  const mutate = async <TData, TError>(write: () => Promise<TActionResult<TData, TError>>): Promise<TActionResult<TData, TError>> => {
    const result = await write();
    if (result.success) await refresh();
    return result;
  }

  // loading
  const retryLoad = async () => {
    setIsLoading(true);
    setLoadError([]);
    setReloadCount(count => count + 1);
  }

  const dismissSaveError = async () => {
    setSaveError([]);
  }

  // session
  const markWalkthroughSeen = async () => {
    await mutate(async () => {
      await storage.saveData<"hasSeenWalkthrough">("hasSeenWalkthrough", true);
      return { success: true, data: true }
    })
  }

  const signUp = async (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    return await mutate(async () => {
      const result = await authApi.signUp(
        userName,
        email,
        password,
        confirmPassword
      );
      if (!result.success) setSaveError([result.error]);
      return result;
    })
  }

  const signIn = async (email: string, password: string) => {
    return await mutate(async () => {
      const result = await authApi.signIn(
        email,
        password
      );
      if (!result.success) setSaveError([result.error]);
      return result;
    })
  }

  const logout = async () => {
    return await mutate(async () => {
      return await authApi.logout();
    })
  }

  const updateProfile = async (userName?: string, bio?: string) => {
    return await mutate(async () => {
      const result = await profileApi.updateProfile(userName, bio);
      if (!result.success) setSaveError([result.error]);
      return result;
    });
  }

  const resetPassword = async (email: string, currentPassword: string, newPassword: string, confirmNewPassword: string) => {
    return await mutate(async () => {
      const result = await authApi.resetPassword(email, currentPassword, newPassword, confirmNewPassword);
      if (!result.success) {
        if (typeof result.error === "string") setSaveError([result.error]);
        else {
          const errors = [];
          for (const field in result.error) {
            errors.push(result.error[field]
                ?? "An error occurred while resetting the password.");
          }
          setSaveError(errors);
        }
      };

      return result;
    });
  }

  const resetForgottenPassword = async (email: string, newPassword: string, confirmNewPassword: string) => {
    return await mutate(async () => {
      const result = await authApi.resetForgottenPassword(email, newPassword, confirmNewPassword);
      if (!result.success) {
        if (typeof result.error === "string") setSaveError([result.error]);
        else {
          const errors = [];
          for (const field in result.error) {
            errors.push(result.error[field]
                ?? "An error occurred while resetting the password.");
          }
          setSaveError(errors);
        }
      };
      return result;
    });
  }

  // demo
  const resetDemoData = async (): Promise<TActionResult<string, never>> => {
    return await mutate(async () => {
      const data: TAppData = {
        users: mockData.mockUsers,
        setups: mockData.mockSetups,
        queue: mockData.mockQueue,
        reports: mockData.mockReports,
        currentUserId: null,
        hasSeenWalkthrough: false,
      };
      await storage.saveAppData(data);
      return { success: true, data: "Demo data reset successfully" };
    });
  }

  // profile
  const getUserName = async (userId: string) => {
    return await profileApi.getUserName(userId);
  }

  // setups
  const addSetup = async (
    title: string,
    description: string,
    repoUrl: string,
    distro: TDistro = "Other",
    dewm: TDesktopWM = "Other",
    shell: TShell = "Other",
    terminal: TTerminal = "Other",
  ) => {
    return await mutate(async () => {
      const result = await setupApi.addSetup(title, description, repoUrl, distro, dewm, shell, terminal);
      if (!result.success) setSaveError([result.error]);
      return result;
    });
  }

  const updateSetup = async (
    setupId: string,
    title?: string,
    description?: string,
    repoUrl?: string,
    distro?: TDistro,
    dewm?: TDesktopWM,
    shell?: TShell,
    terminal?: TTerminal) => {
    return await mutate(async () => {
      const result = await setupApi.updateSetup(setupId, title, description, repoUrl, distro, dewm, shell, terminal);
      if (!result.success) setSaveError([result.error]);
      return result;
    });
  }

  const deleteSetup = async (setupId: string) => {
    return await mutate(async () => {
      const result = await setupApi.deleteSetup(setupId);
      if (!result.success) setSaveError([result.error]);
      return result;
    });
  }

  // queue
  const getQueueEntry = async (setupId: string) => {
    return await setupApi.getQueueEntry(setupId);
  }

  const saveToQueue = async (setupId: string, status: TQueueStatus) => {
    return await mutate(async () => {
      const result = await setupApi.saveToQueue(setupId, status);
      if (!result.success) setSaveError([result.error]);
      return result;
    });
  }

  const changeQueueStatus = async (setupId: string, status: TQueueStatus) => {
    return await mutate(async () => {
      const result = await setupApi.changeQueueStatus(setupId, status);
      if (!result.success) setSaveError([result.error]);
      return result;
    });
  }

  const removeFromQueue = async (setupId: string) => {
    return await mutate(async () => {
      const result = await setupApi.removeFromQueue(setupId);
      if (!result.success) setSaveError([result.error]);
      return result;
    });
  }

  // reports
  const getReportsForSetup = async (setupId: string) => {
    return await setupApi.getReportsForSetup(setupId);
  }

  const addReport = async (setupId: string, distro: TDistro, verdict: TVerdict) => {
    return await mutate(async () => {
      const result = await setupApi.addReport(setupId, distro, verdict);
      if (!result.success) setSaveError([result.error]);
      return result;
    });
  }

  // derived values
  const user = users.find(user => user.id === currentUserId) ?? null;
  const myQueue = queue.filter(entry => entry.userId === currentUserId);

  const queuedSetups: TQueuedSetup[] = [];
  for (const entry of myQueue) {
    const setup = setups.find(s => s.id === entry.setupId);
    if (setup !== undefined) {
      queuedSetups.push({ setup, status: entry.status })
    }
  }

  const value: TAppContext = {
    isLoading,
    loadError,
    saveError,
    retryLoad,
    dismissSaveError,
    user,
    hasSeenWalkthrough,
    markWalkthroughSeen,
    signIn,
    signUp,
    logout,
    updateProfile,
    resetPassword,
    resetForgottenPassword,
    resetDemoData,
    setups,
    getUserName,
    addSetup,
    updateSetup,
    deleteSetup,
    queuedSetups,
    getQueueEntry,
    saveToQueue,
    changeQueueStatus,
    removeFromQueue,
    getReportsForSetup,
    addReport,
  };

  return (<AppContext.Provider value={value}>{children}</AppContext.Provider>);
}
