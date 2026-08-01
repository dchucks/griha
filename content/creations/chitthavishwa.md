---
title: "Chittha Vishwa — India's First Hindi Blog Aggregator"
category: "Web Project"
summary: "Chittha Vishwa was the first-ever aggregator of Hindi blogs — a hobby project built on free Java hosting that tracked Hindi blog feeds, blogger profiles, trivia, and community statistics at a time when no such resource existed."
image_thumb: "/images/creations/chitthaVishwa-thumb.png"
image: "/images/creations/chitthaVishwa-main.png"
imageCaption: "Chittha Vishwa — चिट्ठा विश्व | Snapshot from the Internet Archive"
date: 2004-01-01
client: "Self-published"
role: "Creator & Maintainer"
externalUrl: "http://web.archive.org/web/*/http://myjavaserver.com/~hindi"
ctaLabel: "Chittha Vishwa on Wayback Machine"
weight: 2
---

[Chittha Vishwa](http://web.archive.org/web/*/http://myjavaserver.com/~hindi) (चिट्ठा विश्व — meaning *Blog World*) was the **first aggregator of Hindi blogs ever created** — a hobby project born out of the need to make the fledgling Hindi blogosphere discoverable at a time when there was no central directory, no feed reader designed for Hindi content, and no way for a new reader to find out what Hindi blogs even existed.

The project was hosted entirely on [MyJavaServer.com](https://web.archive.org/web/20090305093642/http://myjavaserver.com/), a free Java web hosting service of the early 2000s. When MyJavaServer.com eventually shut down its free hosting service, Chittha Vishwa went offline with it — but not before serving as the primary discovery hub for the Hindi blogosphere during its most formative years.

## The Technical Architecture

{{< alert type="info" >}}
Chittha Vishwa was built entirely on free infrastructure — no paid hosting, no database licence, no budget. It was a genuine garage project, held together by creative reuse of tools that were never quite intended for the purpose.
{{< /alert >}}

The stack was unconventional by design — or rather, by constraint:

{{< card title="Feed Aggregation — Blogdigger" >}}
The actual RSS feed aggregation was handled by [Blogdigger](https://web.archive.org/web/20090305093642/http://www.blogdigger.com/index.html) — a free blog search engine and feed aggregator launched in 2003, one of the earliest such services on the web. Blogdigger accepted an **OPML file** (a standard format for lists of RSS feed URLs) and returned a combined RSS feed of all the blogs in that list.

Chittha Vishwa maintained the OPML file of all known Hindi blog RSS feeds, submitted it to Blogdigger, and then parsed the aggregated RSS XML returned by Blogdigger to display the latest posts from across the Hindi blogosphere on a single page.
{{< /card >}}
<br>
{{< card title="Data Persistence — Java Properties Files" >}}
Rather than a conventional relational database — which was either unavailable or impractical on free Java hosting — all site data (blogger profiles, trivia, statistics, community information) was stored and retrieved using **Java `.properties` files**, read and written directly by the Servlets.

This was almost certainly not the intended use case for Java's Properties API, which was designed for application configuration rather than content storage. But it worked — and it meant the site could run without any database dependency whatsoever, making it perfectly suited to the constraints of free shared Java hosting.
{{< /card >}}
<br>
{{< card title="Backend Logic — Java Servlets & JSP" >}}
The backend was built using **Java Servlets** — which handled the heavy lifting:

- Fetching and **parsing the aggregated RSS XML** returned by Blogdigger
- Reading and writing **Java `.properties` files** to retrieve blogger profiles, trivia, and community data
- Assembling the processed data and passing it to the view layer

**JavaServer Pages (JSP)** handled the presentation layer — receiving the data prepared by the Servlets and rendering it as HTML for the browser. This Servlet + JSP pattern was the standard Model-View separation approach for Java web applications of that era, and using it on a free hobby project was itself a sign of how seriously the project was taken technically.
{{< /card >}}

## What the Site Contained

Beyond the aggregated feed of latest Hindi blog posts, Chittha Vishwa was also a community reference resource — possibly the first of its kind for the Hindi blogosphere:

- **Blogger profiles** — introductions to the Hindi bloggers of the time, many of whom are now well-known names in Hindi digital publishing
- **Blogosphere trivia** — facts and statistics about the growing Hindi blogging community
- **Community statistics** — tracking the growth of Hindi blogs over time
- **Resource links** — pointing new bloggers to tools, tutorials, and community spaces

{{< alert type="success" >}}
In the absence of any Hindi-language equivalent of Technorati or Bloglines, Chittha Vishwa served as the **de facto homepage of the Hindi blogosphere** — the place a new reader or blogger would go to find out who was writing, what they were writing about, and how to join the community.
{{< /alert >}}

## The Broader Context

Chittha Vishwa was not a standalone project — it was part of a cluster of community infrastructure that I was building simultaneously in the mid-2000s to make Hindi blogging more accessible and more visible:

- **[Aavaran](/creations/aavaran/)** — Hindi templates for Blogger
- **[Sarvagya](http://web.archive.org/web/20061004213632/http://www.akshargram.com/sarvagya/)** — a wiki for Hindi internet usage guides
- **Chitthakar** — a Google Groups mailing list for Hindi bloggers (800+ members)
- **[Nirantar](/creations/nirantar/)** — the world's first Hindi blogzine
- **[The Indibloggies](/creations/indibloggies/)** — India's first blog awards

Chittha Vishwa was the discovery layer that connected all of these — the place where a reader could find the blogs, and where the community could see itself reflected as a whole.

## Archival Status

{{< alert type="warning" >}}
The original site at `myjavaserver.com/~hindi` is no longer accessible — MyJavaServer.com's free hosting service has been discontinued. Partial snapshots of the site are preserved via the [Internet Archive's Wayback Machine](http://web.archive.org/web/*/http://myjavaserver.com/~hindi), though coverage is incomplete. Similarly, [Blogdigger](https://web.archive.org/web/20090305093642/http://www.blogdigger.com/index.html) — the feed aggregation service that powered Chittha Vishwa's core functionality — is also no longer active.
{{< /alert >}}