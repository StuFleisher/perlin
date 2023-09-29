// import * as React from "react";
import { useEffect, createRef } from "react";
import P5 from "p5";

// import Sketch from "react-p5";



/** Draws a perlin line using curved interpolation
 *
 * Settings object example:
 *    {offset, gridSize, resolution, octaves, influence}
*/
function drawCurves(p5, settings) {
  console.log("p5=",p5._renderer)

  p5.beginShape();
  for (let x = 0; x < settings.width; x += (settings.width / settings.gridSize)) {
    p5.noiseSeed(1);
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

  const canvasContainer = createRef();

  const sketch = (p) => {

    p.setup = () => {
      console.log("running setup");

      p.createCanvas();
      p.resizeCanvas(Number(settings.width), Number(settings.height));
      p.noiseSeed(1);
    };

    p.draw = () => {
      console.log("running draw");

      p.frameRate(1);

      p.background(20, 40, 30);
      drawCurves(p, settings);
      p.noLoop();
    };
  };
  const p = new P5(sketch);

  useEffect(() => {
    drawCurves(p,{settings})
  }, [settings]);

  return (
    <div ref={canvasContainer}></div>
  )
}

export default Canvas;