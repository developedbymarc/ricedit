import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto"

import type { TAppData, TQueueEntry, TReport, TSetup, TUser } from "@/data/types";

const APP_DATA_KEY = "RICEDIT_APP_DATA";

export const uuid = randomUUID;

const reset = async (): Promise<TAppData> => {
  const empty: TAppData = {
    users: [] as TUser[],
    setups: [] as TSetup[],
    queue: [] as TQueueEntry[],
    reports: [] as TReport[],
    currentUserId: null,
    hasSeenWalkthrough: false
  };

  await saveAppData(empty);
  return empty;
}

export const loadAppData = async (): Promise<TAppData> => {
  const data = await AsyncStorage.getItem(APP_DATA_KEY);
  if (data === null) {
    return await reset();
  };

  return JSON.parse(data) as TAppData;
};

/**
 * Best used for batched operations
 */
export const saveAppData = async (data: TAppData): Promise<void> => {
  await AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
}

/**
 * Best used for single save operations
 */
export const saveData = async <T extends keyof TAppData>(repo: T, data: TAppData[T]): Promise<void> => {
  const appData = await loadAppData();
  appData[repo] = data;
  saveAppData(appData);
}
