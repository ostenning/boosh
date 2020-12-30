import React, { useEffect, useState } from 'react';
import { Dsp } from '../types/interfaces';
import * as d3 from 'd3';

interface Props {
    samples: Float32Array;
    dsp: Dsp;
}

const Fourier: React.FC<Props> = ({ dsp, samples }) => {
    const [graph, setGraph] = useState<any>();

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const line = d3.line()
            .x(function (_, i) { return x(i) })
            .y(function (d) { return y(d) });

        let svg = d3.select("#fourier-graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        let x = d3.scaleLinear().domain([0, 512]).range([0, width]);
        let y = d3.scaleLinear().domain([0, 300]).range([height / 2, 0]);
        setGraph({ svg, x, y, line });
    }, []);

    let data;
    useEffect(() => {
        if (!samples || !samples.length || !graph) return;

        data = dsp.fft(samples as unknown as Float64Array);
        data = data.slice(0, 512);

        if (graph.svg.select("path").empty()) {
            graph.svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("d", graph.line)
        } else {
            graph.svg.select("path")
                .datum(data)
                .attr("d", graph.line)
        }
    }, [samples, dsp, graph])

    return (
        <div>
            <h3>Fourier</h3>
            <div id="fourier-graph" />
            {data}
        </div>
    );
}

export default Fourier;
