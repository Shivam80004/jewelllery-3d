import Canvas from './experience/Canvas.jsx'
import HUD from './components/HUD.tsx';
import Loader from './components/Loader.tsx';
import { useRingConfigurator } from './store/useRingConfigurator';

export default function App() {
  const { isLoaded } = useRingConfigurator();

  return (
    <main className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-obsidian touch-none">
      {/* 3D Canvas Layer - Absolute Background */}
      <div className="absolute inset-0 z-0">
        <Canvas />
      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-obsidian">
          <Loader />
        </div>
      )}

      {/* Floating HUD Layer - Interactive Foreground */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <HUD />
      </div>
    </main>
  );
}
