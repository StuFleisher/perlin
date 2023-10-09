// import * as React from "react";
import { useLayoutEffect, useEffect, useState, createRef } from "react";
import P5 from "p5";
import { linear } from "./helpers/helpers";


/** generates a set of coordinates using perlin noise to control y value*/

function generateCoords(p5, settings, time) {

  const xVals = new Set();
  //generate x values without duplicates
  for (let i = 0; i <= settings.octaves; i++) {
    const octaveScale = (settings.subScaling ** i);
    let spacing = (settings.spacing * octaveScale);
    for (let x = 0 - spacing; x <= settings.width + spacing; x += spacing) {
      xVals.add(x);
    }
  }

  const coords = [];
  //sort x values into an array
  for (const x of xVals) {
    coords.push([x]);
  }
  coords.sort((a, b) => a[0] - b[0]);

  //generate y values
  for (const coord of coords) {

    let x = coord[0];
    let y = settings.midpoint;

    //checks position of x relative to the canvas to determine the correct
    //value for the noise function
    let xEvolution = linear(
      x,
      0, settings.width,
      settings.evolution, settings.evolution + settings.evolutionStep * settings.vertexCount
    );

    //adjust y value per octave
    for (let i = 0; i <= settings.octaves; i++) {
      const octaveInfluence = (settings.subInfluence ** i);

      let noiseOffset = xEvolution + (settings.subOffset * i) + time;
      let yNoise = p5.noise(noiseOffset) - .5;
      yNoise *= settings.yScale;
      let adjustment = linear(
        yNoise,
        -.5, .5,
        -settings.midpoint + settings.margin, settings.midpoint - settings.margin);
      adjustment *= octaveInfluence;

      y += adjustment;
    }

    coord.push(y);
  }

  return coords;
}

/** adds a grid line at each vertex (ignoring subsettings) */
function drawGrid(p5, settings) {
  for (let x = 0 - settings.spacing;
    x <= settings.width + settings.spacing;
    x += settings.spacing) {
    p5.stroke('rgba(255,255,255,.1)');
    p5.line(x, 0, x, settings.height);
  }

  for (let y = 0; y <= settings.height; y+=settings.height*settings.yScale/settings.vertexCount){
    p5.stroke('rgba(255,255,255,.1)');
    p5.line(0, y, settings.width, y);
  }
}


/** Given a p5 instance and a set of perlinSettings, draws a bezier curve
 * using perlin noise to generate y values.
 */

function drawCurves(p5, settings) {
  let timeOffset = p5.frameCount * settings.animationSpeed;
  p5.beginShape();
  p5.noFill();
  p5.stroke(255);
  p5.strokeWeight(2);
  for (const coord of generateCoords(p5, settings, timeOffset)) {
    p5.circle(coord[0], coord[1], 5);
    p5.vertex(coord[0], [coord[1]]);
  }
  p5.endShape();

  // p5.line(settings.width / 2, 0, settings.width / 2, settings.height);
  // p5.stroke('rgba(255,255,255,.1)');

}


function Canvas({ settings }) {
  const canvasContainer = createRef();
  const [sketchInstance, setSketchInstance] = useState(null);
  console.log("rendering canvas with", sketchInstance, settings);

  const sketch = (p) => {

    p.setup = () => {
      console.log("running setup");
      p.createCanvas();
      p.resizeCanvas(Number(settings.width), Number(settings.height));
      p.background(20, 40, 30);
      p.frameRate(60);

      drawCurves(p, settings);
      // p.noLoop()
    };

    p.draw = () => {
      p.noiseSeed(settings.seed);
      p.clear();
      p.background(20, 40, 30);

      drawCurves(p, settings);
      drawGrid(p, settings);
      // drawCurves(p, settings, false);

    };

  };

  if (!sketchInstance) {
    console.log("building canvas");
    setSketchInstance(new P5(sketch, canvasContainer.current));
  }

  // useEffect(() => {
  //   let newSketch = new P5(sketch, canvasContainer.current);
  //   setSketchInstance(newSketch)

  //   return () => newSketch.remove();
  // }, [settings]);


  return (
    <div className="canvas-container" ref={canvasContainer}></div>
  );
}

export default Canvas;