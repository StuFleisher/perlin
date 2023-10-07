import './App.css';
import React from 'react';
import { useState, useCallback } from 'react';

import Canvas from './Canvas';
import PerlinForm from './PerlinForm';
import PerlinSettings from "./models/models";


// const INITIAL_SETTINGS = {
//   width: 960,
//   height: 540,
//   animationSpeed: 0,
//   evolution: 0,
//   vertexCount: 20,
//   yScale:1,
//   evolutionStep: .5,
//   octaves: 0,
//   subScaling:.5,
//   subInfluence:.5,
//   subOffset:0,
// };

function App() {
  const [perlinSettings, setPerlinSettings] = useState(new PerlinSettings());

  // const perlinSettings = new PerlinSettings();
  console.log("app rerender", perlinSettings);

  const updateSettings = useCallback((data)=> {
    console.log("updating app settings.", data);
    let settings= perlinSettings.update(data).duplicate();
    console.log("new instance", settings);
    setPerlinSettings(settings);
  },[])

  return (
    <main>
      <PerlinForm
        settings={perlinSettings}
        updateParentSettings={updateSettings} />
      <Canvas settings={perlinSettings} />
    </main>
  );

}

export default App;
