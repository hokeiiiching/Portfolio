import { Desktop } from './components/layout/Desktop/Desktop';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Desktop />
    </SettingsProvider>
  );
}

export default App;
