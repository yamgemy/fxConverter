import { NavigationProp, RouteProp } from "@react-navigation/native"

// you can replace "any" according to the https://reactnavigation.org/docs/typescript
export interface InitialSampleScreenProps {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}
