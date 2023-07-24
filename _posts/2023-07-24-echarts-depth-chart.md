---
layout: post
title: Echarts depth chart
date: 2023-07-24
Author: Stark 
tags: [Frontend]
comments: true
toc: true
---

交易深度图是一种常见的金融图表，它用于显示买入和卖出订单在不同价格级别上的累积数量。这种图表可以帮助交易者更好地了解市场的流动性和价格趋势，从而做出更明智的交易决策。在本篇博客中，我们将学习如何使用 ECharts 这个功能强大的 JavaScript 图表库来绘制交易深度图。

1、准备工作

在开始之前，你需要创建一个新的 React 或纯 HTML 页面，并在其中添加 ECharts 的引用。你可以通过 npm 或直接下载 ECharts 的脚本文件来引入。

```
<!-- 引入 ECharts 脚本 -->
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
```
2、准备数据

交易深度图需要正确的数据格式才能正确显示。你需要一个包含买入和卖出订单的数组，每个订单都包含价格和累积数量。例如：

```
const depthData = [
  { price: 100, bidAmount: 500 },
  { price: 99, bidAmount: 300 },
  { price: 98, bidAmount: 200 },
  // 添加更多买入订单...
  { price: 102, askAmount: 700 },
  { price: 103, askAmount: 400 },
  { price: 104, askAmount: 100 },
  // 添加更多卖出订单...
];
```
3、初始化 ECharts 图表

在准备好数据后，我们需要初始化 ECharts 图表，并配置其选项。在本例中，我们将创建一个柱状图和线图组合的图表，以显示买入和卖出订单的深度。

```
// 获取包含图表的 DOM 元素
const chartContainer = document.getElementById('depthChart');

// 初始化 ECharts 实例
const myChart = echarts.init(chartContainer);

// 配置图表选项
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: depthData.map((item) => item.price),
  },
  series: [
    {
      name: '买入订单',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        position: 'insideRight',
      },
      data: depthData.map((item) => item.bidAmount),
    },
    {
      name: '卖出订单',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        position: 'insideLeft',
      },
      data: depthData.map((item) => item.askAmount),
    },
  ],
};
```

// 使用配置项显示图表
`myChart.setOption(option);`
4、呈现图表

现在，我们已经完成了 ECharts 图表的初始化和配置。将以下代码添加到你的 HTML 页面中的图表容器中：

```
<div id="depthChart" style="width: 100%; height: 500px;"></div>
```
确保将图表容器的宽度和高度设置为适当的尺寸，以便图表可以正确显示。

5、运行项目

保存所有文件并在浏览器中打开你的页面。现在，你应该能够看到一个漂亮的交易深度图，显示了买入和卖出订单在不同价格级别上的累积数量。

Happy coding！





