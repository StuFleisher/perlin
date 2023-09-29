import { useState } from "react";
import "./PerlinForm.css"


function PerlinForm({settings, updateSettings}){

  const [formData,setFormData]= useState(settings);

  console.log("rendering form", formData)

  function handleChange(evt){
    evt.preventDefault();

    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: Number(value),
    }));
    updateSettings(formData);

  }

  function handleSubmit(evt){
    evt.preventDefault();
    updateSettings(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <label htmlFor="width">Canvas Width</label>
        <input
          name="width"
          type="number"
          value={formData.width}
          onChange={()=>handleChange}/>
      </div>

      <div>
        <label htmlFor="height">Canvas Height</label>
        <input
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}/>
      </div> */}

      <div>
        <label htmlFor="offset">Offset</label>
        <input
          name="offset"
          type="range"
            min="0"
            max="1"
            step=".01"
          value={formData.offset}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="gridSize">Grid Size</label>
        <input
          name="gridSize"
          type="range"
            min="1"
            max="100"
          value={formData.gridSize}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="resolution">Resolution</label>
        <input
          name="resolution"
          type="range"
          min="0"
          max="1"
          step=".01"
          value={formData.resolution}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="octaves">Octaves</label>
        <input
          name="octaves"
          type="range"
            min="0"
            max="1"
            step=".01"
          value={formData.octaves}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="influence">Influence</label>
        <input
          name="influence"
          type="range"
            min="0"
            max="1"
            step=".01"
          value={formData.influence}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="animationSpeed">Animation Speed</label>
        <input
          name="animationSpeed"
          type="range"
            min="0"
            max="30"
            step="1"
          value={formData.animationSpeed}
          onChange={handleChange}/>
      </div>

      <input type="submit"/>

    </form>
  )
}


export default PerlinForm;