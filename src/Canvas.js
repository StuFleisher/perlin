// import * as React from "react";
import { useLayoutEffect, useState, createRef } from "react";
import P5 from "p5";

/** Draws a perlin line using curved interpolation
 *
 * Settings object example:
 *    {offset, gridSize, resolution, octaves, influence}
*/
function drawCurves(p5, settings) {

  p5.beginShape();
  for (let x = 0; x < settings.width; x += (settings.width / settings.gridSize)) {
    p5.noiseSeed(99);
    p5.noiseDetail(settings.octaves, settings.influence);
    const y = p5.noise(settings.offset) * settings.height;

    p5.circle(x, y, 5);
    p5.noFill();
    p5.strokeWeight(2);
    p5.stroke(255);
    p5.curveVertex(x, y);

    settings.offset += settings.resolution;
  }
  p5.endShape();
}

function Canvas({ settings }) {
  console.log("rendering canvas")
  // const [sketchInstance,setSketchInstance] = useState(null);

  const canvasContainer = createRef();

  const sketch = (p) => {

    p.setup = () => {
      p.createCanvas();
      p.resizeCanvas(Number(settings.width), Number(settings.height));
    };

    p.draw = () => {
      p.clear()
      p.background(20, 40, 30);
      drawCurves(p, settings);
      // p.noLoop();
    };

  };

  useLayoutEffect(() => {
    console.log("use effect running")
    let sketchInstance = new P5(sketch, canvasContainer.current)

    return ()=> sketchInstance.remove()
  }, [canvasContainer,settings]);


  return (
    <div ref={canvasContainer}></div>
  )
}

export default Canvas;