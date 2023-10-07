// import * as React from "react";
import { useLayoutEffect, useState, createRef } from "react";
import P5 from "p5";
import { linear } from "./helpers/helpers";


/** generates a set of coordinates using perlin noise to control y value*/

function generateCoords(p5, settings) {
  const coords = [];
  // iterate through octaves

  for (let i = 0; i <= settings.octaves; i++) {
    let currEvolution = settings.evolution;
    let spacing = settings.spacing * settings.subScaling ** (i);

    for (let x = 0 - spacing; x < settings.width + spacing; x += spacing) {
      //create or update y value
      const currPoint = coords.find(coord => coord[0] === x);
      let y;
      if (!currPoint) {
        y = linear(p5.noise(currEvolution), 0, 1, settings.minY, settings.maxY);
      } else {
        y = currPoint[1];
        //TODO: adjust existing y values per octave
      }

      coords.push([x, y]);
      currEvolution += settings.evolutionStep * settings.subScaling ** (i);
    }
  }

  //TODO:  sort coords by x value
  return coords;
}

/** Given a p5 instance and a set of perlinSettings, draws a bezier curve
 * using perlin noise to generate y values.
 */

function drawCurves(p5, settings, useOcatves = true) {

  p5.beginShape();
  p5.noFill();
  p5.stroke(255);
  p5.strokeWeight(2);

  for (const coord of generateCoords(p5, settings)){
    p5.circle(coord[0], coord[1], 5);
    p5.vertex(coord[0], [coord[1]]);
  }

  p5.endShape();
}


function Canvas({ settings }) {
  console.log("rendering canvas with",settings)
  const canvasContainer = createRef();
  const [sketchInstance,setSketchInstance] = useState(null);

  const sketch = (p) => {

    p.setup = () => {
      p.createCanvas();
      p.resizeCanvas(Number(settings.width), Number(settings.height));
      p.noiseSeed(99);
      p.background(20, 40, 30);
      p.frameRate(60);

      drawCurves(p, settings);
      // p.noLoop()
    };

    p.draw = () => {
      p.clear();
      p.background(20, 40, 30);

      drawCurves(p, settings);
      // drawCurves(p, settings, false);

    };

  };

  if (!sketchInstance) setSketchInstance(
    new P5(sketch, canvasContainer.current)
    )
  // let sketchInstance = new P5(sketch, canvasContainer.current);
  // useLayoutEffect(() => {
  //   let sketchInstance = new P5(sketch, canvasContainer.current);

  //   return () => sketchInstance.remove();
  // }, [canvasContainer, settings]);


  return (
    <div ref={canvasContainer}></div>
  );
}

export default Canvas;