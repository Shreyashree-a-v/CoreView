import { useRef, useEffect } from "react";
import type { FC } from "react";
import * as d3 from "d3";

type DataItem = { name: string; value: number };

interface Props {
  data: DataItem[];
}

const PieChart: FC<Props> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  const width = 200;
  const height = 200;
  const radius = Math.min(width, height) / 2;

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const color = d3
      .scaleOrdinal<string, string>()
      .domain(data.map((d) => d.name))
      .range(["#1E40AF", "#F59E0B", "#10B981", "#EF4444", "#6366F1"]);

    const pie = d3.pie<DataItem>().value((d) => d.value)(data);
    const arc = d3.arc<d3.PieArcDatum<DataItem>>().innerRadius(0).outerRadius(radius);

    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    g.selectAll("path")
      .data(pie)
      .join("path")
      .attr("d", (d) => arc(d) ?? "")
      .attr("fill", (d) => color(d.data.name))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .transition()
      .duration(800)
      .attrTween("d", (d: d3.PieArcDatum<DataItem>) => {
        const start = { startAngle: 0, endAngle: 0 };
        const interpolator = d3.interpolateObject(start, d);
        return (t: number) => arc(interpolator(t) as d3.PieArcDatum<DataItem>) ?? "";
      });

    // Labels
    g.selectAll("text")
      .data(pie)
      .join("text")
      .text((d) => d.data.name)
      .attr("transform", (d) => {
        const c = arc.centroid(d) as [number, number];
        return `translate(${c[0]},${c[1]})`;
      })
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#111827");
  }, [data]);

  return <svg ref={ref} width={width} height={height} />;
};

export default PieChart;
