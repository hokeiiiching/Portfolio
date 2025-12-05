import { Desktop } from './components/layout/Desktop/Desktop';
import { SettingsProvider } from './contexts/SettingsContext';
import { AchievementsProvider } from './contexts/AchievementsContext';


function App() {
  return (
    <SettingsProvider>
      <AchievementsProvider>
        <Desktop />
      </AchievementsProvider>
    </SettingsProvider>
  );
}

export default App;
