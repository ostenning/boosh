import React, { useEffect, useState } from 'react';
import { Dsp } from '../types/interfaces';
import * as d3 from 'd3';

const FREQ_MAX = 20e3;
const SPECTRUM_WIDTH = 1024;

interface Props {
  samples: Float32Array;
  dsp: Dsp;
}

const FourierGraph: React.FC<Props> = ({ dsp, samples }) => {
  const [graph, setGraph] = useState<any>();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    let y = d3
      .scaleLinear()
      .domain([0, 300])
      .range([height / 2, 0]);
    let x = d3.scaleLinear().domain([0, SPECTRUM_WIDTH]).range([0, width]);

    const line = d3
      .line()
      .x((_, i) => x(i))
      // .y((d) => y(Math.abs((d as unknown) as number)));
      .y((d) => y(d as unknown as number));

    let svg = d3
      .select('#fourier-graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // add initial line
    svg
      .append('path')
      .datum([])
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Draw the axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - 150})`) // This controls the vertical position of the Axis
      .call(d3.axisBottom(x).tickFormat(x => `${x.valueOf() * FREQ_MAX / SPECTRUM_WIDTH}`));

    setGraph({ svg, line });
  }, []);

  useEffect(() => {
    if (!samples || !samples.length || !graph) return;

    let data = dsp.fft(samples);
    data = data.slice(0, SPECTRUM_WIDTH);

    // update path
    graph.svg.select('path').datum(data).attr('d', graph.line);
  }, [samples, dsp, graph]);

  return (
    <div>
      <h3>Fourier</h3>
      <div id="fourier-graph" />
    </div>
  );
};

export default FourierGraph;
