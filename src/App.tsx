import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { StepProvider } from "./contexts/StepContext";

function App() {
  return (
    <AuthProvider>
      <StepProvider>
        <Router />
      </StepProvider>
    </AuthProvider>
  );
}
export default App;
