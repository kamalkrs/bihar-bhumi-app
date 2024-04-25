import { PaperProvider } from "react-native-paper";
import { themes } from "./src/utils/themes";
import AppRouter from "./src/utils/routes";
import { Provider } from "react-redux";
import { stores } from "./src/stores/stores";

function App() {
  return (
    <Provider store={stores}>
      <PaperProvider theme={themes}>
        <AppRouter />
      </PaperProvider>
    </Provider>
  )
}

export default App;