"use client";
// @ts-nocheck
/* eslint-disable */

import * as d3 from "d3";
import React from "react";

const Charts = ({
  data = [
    { time: 0, volume: 0 },
    { time: 1, volume: 1 },
  ],
  TimeFrom = 0,
  TimeTo = 0,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 120,
}: {
  data: { time: number; volume: number }[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  TimeFrom?: number;
  TimeTo?: number;
}) => {
  const gx = React.useRef();
  const gy = React.useRef();
  const x = d3.scaleTime(
    [new Date(TimeFrom * 1000), new Date(TimeTo * 1000)],
    [marginLeft, width - marginRight]
  );
  const y = d3.scaleLinear(
    d3.extent(data, (d) => d.volume),
    [height - marginBottom, marginTop]
  );
  const line = d3
    .line()
    .x((d) => x(new Date(d.time * 1000)))
    .y((d) => y(d.volume));
  React.useEffect(
    () => void d3.select(gx.current).call(d3.axisBottom(x)),
    [gx, x]
  );
  React.useEffect(
    () => void d3.select(gy.current).call(d3.axisLeft(y)),
    [gy, y]
  );
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)}
      />
      {data.length === 0 ? (
        <text
          transform={`translate(${width / 2},${(height - marginBottom) / 2})`}
        >
          no actual data
        </text>
      ) : (
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          {data.map((d, i) => (
            <circle
              key={i}
              cx={x(new Date(d.time * 1000))}
              cy={y(d.volume)}
              r="2.5"
            />
          ))}
        </g>
      )}
    </svg>
  );
};

export default Charts;
