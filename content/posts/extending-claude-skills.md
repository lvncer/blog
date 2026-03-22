---
title: "Extending Claude's capabilities with skills and MCP servers"
description: "Learn how skills and MCP work together to build agents that follow your workflows and use external systems and platforms effectively."
date: "2025-12-19"
category: "Agents"
products:
  - "Claude apps"
  - "Claude Developer Platform"
useCase:
  - "Agents"
themeColor: "#5eb3e8"
heroIcon: "◆"
---

_Update: (December 19, 2025) — This article describes how custom skills and MCP extend what assistants can do._

## Why skills matter

When you want an assistant to follow *your* workflows and connect to *your* tools, you need two things: **clear instructions** (skills) and **live bridges** to systems (MCP servers). Together they turn a general model into something that behaves like a product.

## How it fits together

Skills package prompts, conventions, and checklists so the model repeats the same quality bar every time. MCP servers expose APIs, databases, or internal services through a standard protocol, so the model does not need bespoke integrations per deployment.

![Architecture sketch: Skills layer above MCP connectors to external systems](/images/plan_content_with_image.png)

The diagram is illustrative — swap in your own services and policies.

### Next steps

- Draft a small skill for one recurring task.
- Stand up one MCP server that wraps an API you already trust.
- Iterate in staging before rolling out broadly.
