import { Alert } from "react-native"

export const DefaultErrorAlert = () => (
  Alert.alert(
    'Ocurrió un error',
    'Inténtelo de nuevo más tarde',
    [
      {
        text: 'Ok'
      }
    ]
  )
)