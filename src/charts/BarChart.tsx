import { useRef, useEffect } from "react";
import type { FC } from "react";
import * as d3 from "d3";

type DataItem = { name: string; value: number };

interface Props {
  data: DataItem[];
}

const BarChart: FC<Props> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous drawings

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Scales
    const x = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yMax = d3.max(data, (d) => d.value) ?? 0;
    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    // Bars
    svg
      .append("g")
      .selectAll<SVGRectElement, DataItem>("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.name) ?? 0)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .attr("fill", "#1E40AF");

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(x) as unknown as (
          g: d3.Selection<SVGGElement, unknown, null, undefined>
        ) => void
      );

    // Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3.axisLeft(y) as unknown as (
          g: d3.Selection<SVGGElement, unknown, null, undefined>
        ) => void
      );
  }, [data]);

  return <svg ref={ref} width={500} height={300} />;
};

export default BarChart;
