import 'react-native-gesture-handler'
import 'react-native-safe-area-context'
import { PaperProvider } from "react-native-paper";
import { themes } from "./src/utils/themes";
import { Provider } from "react-redux";
import { stores } from "./src/stores/stores";
import { AppRouter } from "./src/config/routes";
import { StatusBar } from "react-native";

function App() {
  return (
    <Provider store={stores}>
      <PaperProvider theme={themes}>
        <StatusBar barStyle="light-content" backgroundColor={'#00857a'} />
        <AppRouter />
      </PaperProvider>
    </Provider>
  )
}

export default App;