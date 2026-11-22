import { DESKTOPS_WMS, DISTROS, QUEUE_STATUSES, SHELLS, TERMINALS, VERDICTS } from "@/data/options";

// use the array as the source of truth
// better than an enum btw, in some cases.
export type TDistro = (typeof DISTROS)[number];
export type TDesktopWM = (typeof DESKTOPS_WMS)[number];
export type TShell = (typeof SHELLS)[number];
export type TTerminal = (typeof TERMINALS)[number];
export type TQueueStatus = (typeof QUEUE_STATUSES)[number];
export type TVerdict = (typeof VERDICTS)[number];

/**
 * @property password saved as plaintext for mock phase
 */
export type TUser = {
  id: string;
  userName: string;
  email: string;
  password: string;
  bio: string;
};

export type TSetup = {
  id: string;
  ownerId: string;
  title: string;
  distro: TDistro;
  dewm: TDesktopWM;
  shell: TShell;
  terminal: TTerminal;
  description: string;
  // tags: string[];
  repoUrl: string;
};

export type TQueueEntry = {
  userId: string;
  setupId: string;
  status: TQueueStatus;
};

/**
 * @property distro is the one the user was using while trying the setup.
 * It's a logical thing to include since one can test the same setup with a different distro
 * than the one the setup owner was using.
 */
export type TReport = {
  id: string;
  setupId: string;
  userId: string;
  userName: string;
  distro: TDistro;
  verdict: TVerdict;
  // note: string;
};

// everything saved into asyncstorage
export type TAppData = {
  users: TUser[];
  setups: TSetup[];
  queue: TQueueEntry[];
  reports: TReport[];
  currentUserId: string | null;
  hasSeenWalkthrough: boolean;
};

export type TActionResult<TData, TError> =
  { success: true; data: TData } | { success: false; error: TError };
