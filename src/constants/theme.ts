import { DefaultTheme } from "react-native-paper"

export const RNPaperTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: "#000000",
    accent: "#f1c40f",
  },
}
