# Architecture

This document describes the architecture of <https://ctrlhabits.com/>.

## Overview

<https://ctrlhabits.com/> is a web application that allows users to track their habits. Users can create habits, and then track their progress on those habits by marking them as complete each custom day. Users can also view their progress on a heatmap, and see their progress over time.

Our platform is made up of several frontend and backend modules. The frontend is written in Svelte, TypeScript, and CSS. The backend is written in TypeScript and SvelteKit (Svelte's battle-tested server-side rendering framework).

### Advantages to using Svelte

[Svelte](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started) is a modern JavaScript framework that empowers developers to build web applications using familiar web technologies such as HTML, CSS, and JavaScript. Unlike traditional frameworks that rely on a runtime library to interpret code, Svelte is a compiler that transforms your code into optimized and highly performant JavaScript, HTML, and CSS.

Because Svelte is a compiler, it offers significant performance advantages over traditional frameworks, especially when it comes to web applications that need to be fast and lightweight. Svelte accomplishes this by analyzing your code and generating highly efficient JavaScript that minimizes the amount of code that needs to be shipped to the user's browser.

Furthermore, Svelte simplifies the development process by providing a clean and concise syntax that minimizes the amount of boilerplate code needed to build web applications. This makes Svelte an excellent choice for developers who prioritize productivity and efficiency.

Overall, Svelte is a cutting-edge framework that offers developers a modern and streamlined approach to building web applications. Its powerful compiler technology and focus on performance and simplicity make it an attractive option for developers looking to build highly efficient and scalable web applications.

> INFO: Learn the basics of Svelte and HTML by following <https://acmcsuf.com/basics>!

### Advantages to using CSS

[CSS, or Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS), is a programming language that web developers use to style the visual appearance of web applications. It is widely recognized as the industry standard for styling web applications and is supported by all modern web browsers.

Compared to Tailwind CSS, a popular utility-first CSS framework, traditional CSS code is typically more expressive and flexible, allowing for more complex styling and greater customization. Additionally, CSS follows a more established syntax and structure, which can make it easier to read and understand over time.

One of the key benefits of using CSS is that it properly separates the concerns of HTML structure and styling, making it easier to maintain and modify web applications over time. This allows developers to focus on each aspect of their application separately, without worrying about how changes to one component will affect others.

Overall, CSS provides a powerful and flexible standard for styling web applications, allowing developers to create visually appealing and engaging user interfaces that enhance the user experience.

### Advantages to using TypeScript

TypeScript is a powerful programming language that enhances the capabilities of JavaScript by introducing features like static typing and interfaces. These additional features enable developers to write more expressive and comprehensible code, ultimately reducing the cognitive burden associated with writing JavaScript.

As a compiler, TypeScript is designed to be transformed into JavaScript, which is the programming language that runs on the user's browser or server. This means that the benefits of TypeScript, such as type checking and syntax enhancements, are primarily realized during the development process, and do not directly affect the performance or behavior of the final application.

Despite this, TypeScript remains a valuable tool for developers as it helps to improve the quality and maintainability of code by reducing the risk of errors and increasing its comprehensibility. By making code more manageable, TypeScript allows developers to write better code in less time and with greater confidence.

### Advantages to using SvelteKit

[SvelteKit](https://kit.svelte.dev/) is a powerful and flexible framework that extends the capabilities of Svelte for building web applications. It offers a set of tools and conventions that are designed to streamline the development process and improve the maintainability of web applications.

SvelteKit provides a consistent and unified approach to building web applications, allowing developers to focus on their code rather than on configuring and managing the underlying infrastructure. SvelteKit also includes a range of built-in features and functionality, such as server-side rendering and dynamic routing, which can significantly reduce development time and improve the overall quality of the application.

Additionally, SvelteKit offers a range of advanced features, such as automatic code splitting and progressive hydration, that make it easier to build high-performance web applications that load quickly and provide a seamless user experience. These features are especially useful for building large-scale web applications that require complex functionality and sophisticated user interfaces.

## Configuration files

Configuration files are files that are rarely changed, as they determine the behavior of the application. Many configuration files are located in the root directory of the project.

### `package.json`

#### `package-lock.json`

### `svelte.config.js`

### `tsconfig.json`

### `vite.config.ts`

## Static files

Static files are assets that are statically served by the application. Static files are located in the `static` directory.

<!-- TODO(EthanThatOneKid): We currently have no rhyme or reason to the structure of our static files. -->

## Environment variables

When developing locally, you can create a `.env` file in the root directory of the project to define environment variables. These environment variables will be loaded into the application when it starts. To start, copy the contents of [`.env.example`](.env.example) into `.env` and fill in the required values.

When deploying to production, you can define environment variables using your hosting provider's dashboard.

<!-- TODO(EthanThatOneKid): Add instructions for deploying to Netlify, Vercel, or Fly.io. -->

### Page endpoints

Minimum viable pages. This PR includes a set of frontend pages containing the logic needed for a minimum viable user experience.

### API endpoints

Our backend API is nearly complete. This PR includes a set of API endpoints utilizing the `OAuthServiceInterface` and `CTRLHabitsServiceInterface` protocols to store and retrieve data as needed.

#### `GET /api/auth/[oauth_service_type]`

Our `GET /api/auth/[oauth_service_type]` endpoint is the endpoint that users redirect to after successfully authenticating with an official OAuth provider. For example, our GitHub OAuth application will be [configured](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow) to redirect users to `https://ctrlhabits.com/api/auth/github`.

The `oauth_service_type` param is defined in `src/params/oauth_service_type.ts`.

### `OAuthServiceInterface`

Our backend uses an instance of `OAuthServiceInterface` to authenticate new and returning users.

<!-- TODO: Elaborate on OAuthServiceInterface implementations. -->

### `CTRLHabitsServiceInterface`

Our backend uses an instance of `CTRLHabitsServiceInterface` to manage the platform's entire storage system. This allows us to select `CTRLHabitsServiceInterface` instances depending on the environment variables. The `CTRLHABITS_SERVICE_TYPE` environment variable determines which `CTRLHabitsServiceInterface` instance to use when the server responds to requests.

<!-- TODO(EthanThatOneKid): Complete ARCHITECTURE.md. -->
