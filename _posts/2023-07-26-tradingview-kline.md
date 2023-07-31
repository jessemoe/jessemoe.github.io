---
layout: post
title: TradingView 绘制交易k线图
date: 2023-07-26
Author: Stark 
tags: [Frontend]
comments: true
toc: true
---
使用 TradingView 绘制k线图的简易指南

TradingView 是一个流行的金融图表库，它可以为网站和应用程序提供丰富的交互式金融图表。要在 TradingView 图表上显示自定义的金融数据，可以通过 Datafeed 接口将数据传递给 TradingView。在本篇博客中，我们将介绍如何通过 TradingView Datafeed 接入数据。

1：选择数据源

首先，我们需要选择用于提供金融数据的数据源。数据源可以是您自己的数据库、第三方金融数据供应商的API，或者任何能够提供金融市场数据的来源。确保您有权使用和传递所选数据源的数据。

2：创建 Datafeed 服务

接下来，我们需要创建一个 Datafeed 服务，用于从数据源获取实时数据，并将数据传递给 TradingView。Datafeed 服务可以是一个后端服务器，使用您熟悉的任何编程语言（例如 JavaScript、Python、Java 等）来编写。

在 Datafeed 服务中，您需要实现以下几个主要功能：

获取实时的金融市场数据（例如股票价格、货币汇率等）。
将获取到的数据进行格式化，以满足 TradingView 的数据要求。
处理 TradingView 发来的历史数据请求，并返回相应的历史数据。
3：实现 Datafeed 接口

TradingView 提供了一个标准的 Datafeed 接口，您需要根据接口规范来实现您的 Datafeed 服务。接口规范包含了一系列请求和响应数据的格式要求，以及定义如何处理历史数据和实时数据的方法。

具体来说，Datafeed 接口需要实现以下几个方法：

onReady(callback: () => void): 在 Datafeed 准备好数据后，调用此方法通知 TradingView。
searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: (symbols: TradingView.LibrarySymbolInfo[]) => void): 根据用户输入搜索符号。
resolveSymbol(symbolName: string, onResolve: (symbolInfo: TradingView.LibrarySymbolInfo) => void, onError: (reason: string) => void): 根据符号名称解析符号信息。
getBars(symbolInfo: TradingView.LibrarySymbolInfo, resolution: string, from: number, to: number, onResult: (bars: TradingView.LibraryBar[], meta: TradingView.LibraryDataMeta) => void, onError: (reason: string) => void): 获取历史数据。
subscribeBars(symbolInfo: TradingView.LibrarySymbolInfo, resolution: string, onTick: (bar: TradingView.LibraryBar) => void, listenerGUID: string): void: 订阅实时数据。
4：配置 TradingView 图表

在您的网页或应用程序中加载 TradingView 图表，并将 Datafeed 配置为使用您实现的 Datafeed 服务。在初始化图表时，将 Datafeed 传递给 TradingView 图表对象，以便与您的 Datafeed 服务进行通信。

步骤 5：测试与调试

在配置完成后，您可以在网页或应用程序中查看 TradingView 图表，并通过 Datafeed 接入数据。确保实时数据和历史数据都可以正确地显示在图表上。

结论

通过 TradingView Datafeed 接入数据可以让您在 TradingView 图表上展示自定义的金融数据。通过创建 Datafeed 服务并实现 Datafeed 接口，您可以将实时数据和历史数据传递给 TradingView，并提供更加丰富和个性化的金融图表体验。

请注意，本文提供了一个简要的指南，Datafeed 接入数据的具体实现可能因您的项目需求和技术栈而有所不同。为了更好地理解和使用 TradingView Datafeed，建议查阅 TradingView 官方文档和开发者指南，以获得更深入的指导和技术支持。
