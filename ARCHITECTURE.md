# Architecture

This document describes the architecture of <https://ctrlhabits.com/>.

## Overview

<https://ctrlhabits.com/> is a web application that allows users to track their
habits. Users can create habits, and then track their progress on those habits
by marking them as complete each custom day. Users can also view their progress
on a heatmap, and see their progress over time.

Our platform is made up of several frontend and backend modules. The frontend is
written in Svelte, TypeScript, and CSS. The backend is written in TypeScript and
SvelteKit (Svelte's battle-tested server-side rendering framework).

### Advantages to using Svelte

[Svelte](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started)
is a modern JavaScript framework that empowers developers to build web
applications using familiar web technologies such as HTML, CSS, and JavaScript.
Unlike traditional frameworks that rely on a runtime library to interpret code,
Svelte is a compiler that transforms your code into optimized and highly
performant JavaScript, HTML, and CSS.

Because Svelte is a compiler, it offers significant performance advantages over
traditional frameworks, especially when it comes to web applications that need
to be fast and lightweight. Svelte accomplishes this by analyzing your code and
generating highly efficient JavaScript that minimizes the amount of code that
needs to be shipped to the user's browser.

Furthermore, Svelte simplifies the development process by providing a clean and
concise syntax that minimizes the amount of boilerplate code needed to build web
applications. This makes Svelte an excellent choice for developers who
prioritize productivity and efficiency.

Overall, Svelte is a cutting-edge framework that offers developers a modern and
streamlined approach to building web applications. Its powerful compiler
technology and focus on performance and simplicity make it an attractive option
for developers looking to build highly efficient and scalable web applications.

> INFO: Learn the basics of Svelte and HTML by following
> <https://acmcsuf.com/basics>!

### Advantages to using CSS

[CSS, or Cascading Style Sheets](https://developer.mozilla.org/en-US/docs/Web/CSS),
is a programming language that web developers use to style the visual appearance
of web applications. It is widely recognized as the industry standard for
styling web applications and is supported by all modern web browsers.

Compared to Tailwind CSS, a popular utility-first CSS framework, traditional CSS
code is typically more expressive and flexible, allowing for more complex
styling and greater customization. Additionally, CSS follows a more established
syntax and structure, which can make it easier to read and understand over time.

One of the key benefits of using CSS is that it properly separates the concerns
of HTML structure and styling, making it easier to maintain and modify web
applications over time. This allows developers to focus on each aspect of their
application separately, without worrying about how changes to one component will
affect others.

Overall, CSS provides a powerful and flexible standard for styling web
applications, allowing developers to create visually appealing and engaging user
interfaces that enhance the user experience.

### Advantages to using TypeScript

TypeScript is a powerful programming language that enhances the capabilities of
JavaScript by introducing features like static typing and interfaces. These
additional features enable developers to write more expressive and
comprehensible code, ultimately reducing the cognitive burden associated with
writing JavaScript.

As a compiler, TypeScript is designed to be transformed into JavaScript, which
is the programming language that runs on the user's browser or server. This
means that the benefits of TypeScript, such as type checking and syntax
enhancements, are primarily realized during the development process, and do not
directly affect the performance or behavior of the final application.

Despite this, TypeScript remains a valuable tool for developers as it helps to
improve the quality and maintainability of code by reducing the risk of errors
and increasing its comprehensibility. By making code more manageable, TypeScript
allows developers to write better code in less time and with greater confidence.

### Advantages to using SvelteKit

[SvelteKit](https://kit.svelte.dev/) is a powerful and flexible framework that
extends the capabilities of Svelte for building web applications. It offers a
set of tools and conventions that are designed to streamline the development
process and improve the maintainability of web applications.

SvelteKit provides a consistent and unified approach to building web
applications, allowing developers to focus on their code rather than on
configuring and managing the underlying infrastructure. SvelteKit also includes
a range of built-in features and functionality, such as server-side rendering
and dynamic routing, which can significantly reduce development time and improve
the overall quality of the application.

Additionally, SvelteKit offers a range of advanced features, such as automatic
code splitting and progressive hydration, that make it easier to build
high-performance web applications that load quickly and provide a seamless user
experience. These features are especially useful for building large-scale web
applications that require complex functionality and sophisticated user
interfaces.

## Configuration files

Configuration files are files that are rarely changed, as they determine the
behavior of the application. Many configuration files are located in the root
directory of the project.

### `package.json`

[This JSON file](package.json) describes information about the project and
stores the information for all of the dependencies (along with their versions)
used in the project. This includes `"dependencies"` that are used inside our
program and `"devDependencies"` that are used for development outside of the
inner-workings of our program.

#### `package-lock.json`

This file is not meant to be modified by humans, but instead left to be managed
by the project's package manager, NPM. Even though it is not affected by
developers, the lock file is still important and so it is
[_advised_](https://blog.logrocket.com/why-you-should-use-package-lock-json/) to
leave it out of the `.gitignore` file.

### `svelte.config.js`

[This file](svelte.config.js) is a JavaScript file that configures the Svelte
compiler. It is used to configure the SvelteKit framework.

> INFO: <https://kit.svelte.dev/docs/configuration>

### `tsconfig.json`

The [TSConfig file](tsconfig.json) is used by the TypeScript compiler to specify
any compilation parameters and settings. In the case of this project, our
TSConfig is mostly extended from
[`@tsconfig/svelte`](https://www.npmjs.com/package/@tsconfig/svelte), an
opinionated base TSConfig for working with Svelte.

### `vite.config.ts`

The [Vite config file](vite.config.ts) is used by the Vite bundler to specify
any bundling parameters and settings.

## Static files

Static files are assets that are statically served by the application. Static
files are located in the `static` directory.

<!-- TODO(EthanThatOneKid): We currently have no rhyme or reason to the structure of our static files. Add global.css and do the favicon.ico dance. -->

### `static/global.css`

[This CSS file](static/global.css) contains global styles and CSS variables that
are applied to the entire application. It is used to define styles that are not
specific to any particular component.

<!-- TODO: Add global.css to the application. -->

## SvelteKit files

The platform's pages are located under [`/src/routes`](src/routes). In that
directory, each file with a prefix <kbd>+</kbd> represents an endpoint of the
website.

| Relative file path                            | Production URL                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `/src/routes/+page.svelte`                    | `https://ctrlhabits.com/`                                              |
| `/src/routes/habits/+page.svelte`             | `https://ctrlhabits.com/habits/`                                       |
| `/src/routes/entries/[entry_id]/+page.svelte` | `https://ctrlhabits.com/entries/55bb790f-c944-4d3d-a1e7-1d613e8e8106/` |

> INFO: <https://kit.svelte.dev/docs/routing>

### `/src/lib` directory

The [`/src/lib`](src/lib) directory contains files that are used by the
application. Commonly used files are strategically placed in this directory to
encourage code reuse and modularity. To further encourage the use of the
`/src/lib` directory, a convenient path alias `$lib` is available for use from
anywhere in the application.

#### `/src/lib/components` directory

The [`/src/lib/components`](src/lib/components) directory contains files that
are used to define components. If a component is composed of subcomponents, the
following directory structure is recommended:

```text
/src/lib/components
└── /component
    └── component.svelte
    └── subcomponent.svelte
```

Where `component.svelte` is imported like such:

```svelte
<script lang="ts">
	import Component from '$lib/components/component/component.svelte';
</script>
```

#### `/src/lib/server` directory

The [`/src/lib/server`](src/lib/server) directory contains files that are
specifically used by the server. These files are not used by the client, and are
only used during server-side rendering. Server files are separate from public
files to prevent them from being unintentionally exposed to the client.

### `/params/oauth_service_type.ts` file

The [`/params/oauth_service_type.ts`](src/params/oauth_service_type.ts) file
contains the `OAuthServiceType` enum, which represents the different types of
OAuth services that are supported (or planned to be supported) by the
application.

This file is used by the `GET /api/oauth/[oauth_service_type]` endpoint to
determine which OAuth service to use.

## Environment variables

When developing locally, you can create a `.env` file in the root directory of
the project to define environment variables. These environment variables will be
loaded into the application when it starts. To start, copy the contents of
[`.env.example`](.env.example) into `.env` and fill in the required values.

When deploying to production, you can define environment variables using your
hosting provider's dashboard.

<!-- TODO(EthanThatOneKid): Add instructions for deploying to Netlify, Vercel, or Fly.io. -->

## Modules

Our platform is supported by modules that are responsible for specific parts of
the application.

Our modules are unit tested using the Vitest framework. To run the tests, run `npm run test:unit`.

### `OAuthServiceInterface`

The responsibility of the `OAuthServiceInterface` is to provide an interface for
the OAuth service that is used by the application. This interface is used to
abstract away the implementation details of the OAuth service, allowing the
application to be easily extended to support other OAuth services in the future.
The `OAuthServiceType` enum represents the different types of OAuth services
that are supported (or planned to be supported) by the application.

<!-- TODO: Elaborate on OAuthServiceInterface implementations. -->

### `CTRLHabitsServiceInterface`

The responsibility of the `CTRLHabitsServiceInterface` is to provide an
interface for storing and mutating the persisted data to power the application.
The `CTRLHabitsServiceType` enum represents the different types of CTRLHabits
services that are supported (or planned to be supported) by the application.

> INFO: For local development it is suggested to pass
> `CTRLHabitsServiceType.LOCAL` to `makeCTRLHabitsService` to use the
> `FileSystemCTRLHabitsService` implementation which uses
> [`/dev/ctrlhabits_service_data.json`](dev/ctrlhabits_service_data.json) as a
> database. This is done by setting the `CTRLHABITS_SERVICE_TYPE` environment
> variable to `local` in the `.env` file.

> INFO: For production it is suggested to pass
> `CTRLHabitsServiceType.POCKETBASE` to `makeCTRLHabitsService` to use the
> `PocketbaseCTRLHabitsService` implementation. This is done by setting the
> `CTRLHABITS_SERVICE_TYPE` environment variable to `pocketbase` in the hosting
> provider's dashboard.

### `$lib/server/jwt`

The responsibility of the `$lib/server/jwt` module is to provide a pair of
helper functions for encoding and decoding JSON Web Tokens (JWTs). The `makeJWT`
function is used to encode a JWT from a payload. The `verifyJWT` function is
used to decode a JWT into a payload which specifically contains an `id` field.

## Page endpoints

A SvelteKit endpoint can be intended to be either a page or an API endpoint. Our
platform utilizes both types of endpoints cohesively.

### `GET /` Home feed

The root page of our website. This page is intended to be a landing page for our
website when the user is not authenticated.

When the user is authenticated, this page renders a feed of the user's
non-private entries.

At the top of the feed, a link to `/habits` and `/entries` is presented to add a
new habit or entry, respectively.

### `GET /claim` Claim tag page

This page is intended to be a landing page for our website when the user is
authenticated but has not claimed their tag. This page presents a form from
which a user can claim their tag. The form action is pointed to
`POST /api/claim` to claim the tag.

### `GET /habits` Add habit form

This page presents a form from which a user can create a new habit. The form
action is pointed to `POST /api/habits` to create a new habit.

### `GET /habits/[habit_id]` Habit detail page

This page presents a form from which a user can update an existing habit. The
form action is pointed to `PATCH /api/habits/[habit_id]` to update the habit.

This page renders a habit detail page for a habit with the given ID in the URL
by fetching from `GET /api/habits/[habit_id]`.

This page also presents a list of entries for the habit in a paginated fashion.

### `GET /entries` Add entry form

This page presents a form from which a user can create a new entry. The form
action is pointed to `POST /api/entries` to create a new entry.

### `GET /entries/[entry_id]` Entry detail page

This page presents a form from which a user can update an existing entry. The
form action is pointed to `PATCH /api/entries/[entry_id]` to update the entry.

### `GET /users/[user_id]` User profile page

The profile page of a user. This page is intended to be a public profile page
for a user.

If the user is authenticated, this page renders a form to update the user's
profile. The form action is pointed to `PATCH /api/users/[user_id]` to update
the user's profile. If the user is not authenticated, this page renders a
read-only view of the user's profile.

## API endpoints

Our API endpoints are used to support our page endpoints. Our API endpoints make use of our platform's modules to provide the functionality that is required by our page endpoints.

### `GET /api/auth/[oauth_service_type]`

Our `GET /api/auth/[oauth_service_type]` endpoint is the endpoint that users
redirect to after successfully authenticating with an official OAuth provider.

For example, our GitHub OAuth application will be
[configured](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow)
to redirect users to `https://ctrlhabits.com/api/auth/github`.

### `GET /api/claim`

Our `GET /api/claim` endpoint is the endpoint that users redirect to after
successfully authenticating with an unofficial OAuth provider. This endpoint is
used to associate a tag with a user's account.

### `GET /api/habits`

Our `GET /api/habits` endpoint is the endpoint that is used to retrieve a list
of habits for the authenticated user.

### `POST /api/habits`

Our `POST /api/habits` endpoint is the endpoint that is used to create a new
habit for the authenticated user.

### `GET /api/habits/[habit_id]`

Our `GET /api/habits/[habit_id]` endpoint is the endpoint that is used to
retrieve a habit with the given ID for the authenticated user.

### `PATCH /api/habits/[habit_id]`

Our `PATCH /api/habits/[habit_id]` endpoint is the endpoint that is used to
update a habit with the given ID for the authenticated user.

### `GET /api/entries`

Our `GET /api/entries` endpoint is the endpoint that is used to retrieve a list
of entries for the authenticated user.

### `POST /api/entries`

Our `POST /api/entries` endpoint is the endpoint that is used to create a new
entry for the authenticated user.

### `GET /api/entries/[entry_id]`

Our `GET /api/entries/[entry_id]` endpoint is the endpoint that is used to
retrieve an entry with the given ID for the authenticated user.

### `PATCH /api/entries/[entry_id]`

Our `PATCH /api/entries/[entry_id]` endpoint is the endpoint that is used to
update an entry with the given ID for the authenticated user.

### `GET /api/users/[user_id]`

Our `GET /api/users/[user_id]` endpoint is the endpoint that is used to retrieve
a user with the given ID.

### `PATCH /api/users/[user_id]`

Our `PATCH /api/users/[user_id]` endpoint is the endpoint that is used to update
a user with the given ID.

<!-- TODO: Figure out how to conclude this document. -->
