import React, { memo, useEffect, useState } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

function Line({ theme = "light", style = {}, option = {} }) {
  const [echartsRef, setRef] = useState(null);
  useEffect(() => {
    if (echartsRef) {
      (echartsRef as any).getEchartsInstance().setOption(option);
    }
    // eslint-disable-next-line
  }, [option]);
  return (
    <ReactEChartsCore
      key="echart"
      ref={(e:any) => setRef(e)}
      echarts={echarts}
      option={option}
      theme={theme}
      style={style}
      notMerge={true}
      lazyUpdate={true}
    />
  );
}

export default memo(Line, (prev, next) => prev.option === next.option);
