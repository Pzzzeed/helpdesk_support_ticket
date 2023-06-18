import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TicketsProvider } from "./contexts/useTicket";

function App() {
  return (
    <TicketsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </TicketsProvider>
  );
}

export default App;
