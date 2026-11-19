import AsyncStorage from "@react-native-async-storage/async-storage";

import type { TAppData } from "@/data/types";

const APP_DATA_KEY = "RICEDIT_APP_DATA";

export const loadAppData = async (): Promise<Partial<TAppData> | null> => {
  const data = await AsyncStorage.getItem(APP_DATA_KEY);
  if (data === null) return null;

  return JSON.parse(data) as Partial<TAppData>;
};

export const saveAppData = async (data: TAppData): Promise<void> => {
  await AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
}
