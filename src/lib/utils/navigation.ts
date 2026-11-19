import { router, type Href } from "expo-router";

export const goBack = (fallbackPath: Href) => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackPath);
  }
}
