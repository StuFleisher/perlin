import './App.css';
import React from 'react';
import { useState } from 'react';

import Canvas from './Canvas';
import PerlinForm from './PerlinForm';

const initialSettings = {
  width: 960,
  height: 540,
  offset: 0,
  gridSize: 20,
  resolution: .2,
  octaves: 1,
  influence:.5,
  animationSpeed: 0,
};

function App() {
  const [perlinSettings, setPerlinSettings] = useState(initialSettings);
  console.log("perlin settings", perlinSettings);

  function updateSettings(settings) {
    console.log("updating settings");
    setPerlinSettings(() => settings);
  }

  return (
    <main>
      <Canvas settings={perlinSettings} />
      <PerlinForm
        settings={perlinSettings}
        updateSettings={updateSettings} />
    </main>
  );

}

export default App;
