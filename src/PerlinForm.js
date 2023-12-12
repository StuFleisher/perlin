import { useState, useEffect } from "react";
import "./PerlinForm.css"


function PerlinForm({settings, updateParentSettings}){

  const [formData,setFormData]= useState(settings);

  console.log("rendering form. Data=", formData)

  function handleChange(evt){
    console.log("Handling change on form inputs")
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: Number(value),
    }));
  }

  useEffect(function updateParentSettingsOnChange(){
    console.log("updating parent with data.",formData)
    updateParentSettings(formData)
  },[formData, updateParentSettings])



  return (
    <form>
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
        <label htmlFor="animationSpeed">Animation Speed</label>
        <input
          name="animationSpeed"
          type="range"
            min="0"
            max=".01"
            step=".001"
          value={formData.animationSpeed}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="vertexCount">Vertexes</label>
        <input
          name="vertexCount"
          type="range"
            min="3"
            max="30"
          value={formData.vertexCount}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="yScale">y-scale</label>
        <input
          name="yScale"
          type="range"
            min=".1"
            max="2"
            step=".1"
          value={formData.yScale}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="evolution">Evolution</label>
        <input
          name="evolution"
          type="range"
            min="0"
            max="1"
            step=".01"
          value={formData.evolution}
          onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="evolutionStep">Evolution Step</label>
         <input
          name="evolutionStep"
          type="range"
          min=".001"
          max="1"
          step=".001"
          value={formData.evolutionStep}
          onChange={handleChange}/>
      </div>

        <h5>sub settings</h5>
      <div>
        <label htmlFor="octaves">Octaves</label>
        <input
          name="octaves"
          type="range"
            min="0"
            max="10"
            step="1"
          value={formData.octaves}
          onChange={handleChange}/>
      </div>

        <div>
          <label htmlFor="subScaling">subInfluence</label>
          <input
            name="subInfluence"
            type="range"
            min="0"
            max="1"
            step=".1"
            value={formData.subInfluence}
            onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="subScaling">subScaling</label>
          <input
            name="subScaling"
            type="range"
            min=".1"
            max="1"
            step=".1"
            value={formData.subScaling}
            onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="subOffset">subOffset</label>
          <input
            name="subOffset"
            type="range"
            min="0"
            max="1"
            step=".01"
            value={formData.subOffset}
            onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="seed">seed</label>
          <input
            name="seed"
            type="number"
            value={formData.seed}
            onChange={handleChange}/>
        </div>

    </form>
  )
}


export default PerlinForm;