# Webstone Education Platform

Hi 👋!

Welcome to this product overview page. Learning how to develop software is broken. Tens of thousands of videos, tutorials, blog posts, articles, etc. are readily available yet how do you know what is worth your time? How do you know the content is correct, up-to-date, or scales to more than ten users in a real-world scenario?

Most importantly, it is nearly impossible to develop a real-world full-stack web application based on individual tutorials. One can learn how to develop a React web application, how to style it and how to deal with local state. However, it gets complicated quickly when developers want to interact with an API, perform server-side business logic and persist data in a database.

Today, developers require countless hours of reading forums, talking to others, and trial & error to maybe eventually make it all work. Is it secure though? Are secrets exposed by accident? Well, it's hard to tell.

The **Webstone Education Platform** changes how we educate people in software development. Courses are based on a real-world application! Everything a student learns happens in the context of this application. At all times, students are aware of the application architecture and where their current lesson fits in.

Each lesson is **interactive** and contains a **mix of text**, **short videos**, **code samples**, **hands-on exercises** and **quizzes** to reinforce learning.

## How does it work for students?

### At the center is an application

Throughout the course, students are reminded where in the overall application architecture any given lesson fits in. This provides a better understanding of what they work on, why and how they can apply it to their own projects. It is also more rewarding to work on an actual application rather than individual, standalone tutorials where each tutorial starts with repetitive setup instructions.

### BYOC - Build your own curriculum

Some developers prefer React for the frontend web application, others prefer Svelte or Vue. Likewise, a REST or GraphQL API may connect to a backend that leverages Next.js, SvelteKit or Rust.

> Each student configures their own curriculum, we call this BYOC as in **B**uild **Y**our **O**wn **C**urriculum.

Alice may choose a Svelte web app, styled with Tailwind CSS, that communicates with SvelteKit through a REST API. The data may be persisted in a MySQL database hosted on Railway whereas the web app, API & backend services are deployed to Vercel.
Bob on the other hand may prefer a React web app developed with Next.js and a a Postgres database, all hosted on AWS.

To visualise that, please see the following diagram.

https://excalidraw.com/#json=61BtnkMzKuI4VaovNXwaD,aEckWJpj1BNhopSF1zl96g

**Module selection**

Students may choose one or more modules. For example, Bob is a backend developer who wants to learn about web development. When he selects his modules, he only picks a _web_ module. The platform will automatically provision _api_, _backend_, and _database_ modules for him so he can focus on web development only, but still in the context of the overall application.

Students may also add additional modules later. Let's take Alice's example from above. Once she completes her learning path, she may decide to learn how to develop a React web app with styled-components. She obtains the React and styled-components _web_ and _styles_ modules and learns these modules in the same repository she already developed the Svelte with Tailwind CSS app. A simple config change allows her to develop & test that new application with the same _backend_ and _database_ modules she previously learned about.

### Learning experience

Lessons are available via a web interface for mobile & desktop. To ensure an immersive learning experience, an accompanying VS Code (_keep this open for JetBrains, etc._) extension is available to assist students when they work on hands-on course material. Rather than integrating a code editor in the web experience, students learn in their familiar code editor environment.

For any lesson, students may decide to let the editor extension show the solution. This can be achieved by clicking a "Show me how" button and acts as an escape hatch to ensure students stay engaged and motivated in difficult situations.

## How does it work for teachers / creators?

The platform acts as a marketplace for teachers to publish their own modules. Someone may be proficient in C# and decides to publish a C# _backend_ module only whereas a full-stack developer may create modules for _web_, _styles_, _API_ & _backend_.

### Create a new module

All course modules, including their lessons and supporting assets, are available in the [`WebstoneHQ/courses`](https://github.com/WebstoneHQ/courses) repository (private).

In phase 1, teachers contribute their content to the above repository directly. At a later time, the platform will provide a web interface to create new course modules.

### Strict module guidelines

When creating modules, teachers must adhere to strict guidelines. For example, to develop a _web_ module, the final HTML structure of each _web_ module has to contain well-defined `data-*` attributes on elements such as buttons, links, forms, etc. These attributes are used by end-to-end tests provided by the platform to validate a module's completeness. Automated tests will validate that a module works in all possible BYOC combinations.

The same applies to _backend_ modules, _database_ schema definitions, etc.

## Developer environment provisioning

When a student completes building their own curriculum, the platform creates a git repository on a student's choice of git hosting provider (i.e. GitHub, GitLab, Bitbucket, ...).

The content of that repository depends on which modules a student's curriculum contains. For example, if a student only selected a _web_ module, their repository will contain that given _web_ module. They will connect to a hosted API so they can learn the _web_ module in the context of a full-stack application.

Each repository will provide a configuration for a ready-to-code developer environment on [Gitpod](https://www.gitpod.io) as well as scripts to set up the project on a local computer. The Gitpod configuration provides students with a one-click developer environment accessible via their browser or preferred desktop IDE - no setup required.

## Pricing

**Students** pay per module. A discount is applied if multiple modules are purchased at once.

**Teachers** (i.e. creators of course modules) get paid a percentage of what students pay for the module a teacher created.

**The platform** keeps a fee for each purchase to cover operating costs and finance further course development and new platform features.

_Exact pricing to be defined. Early-bird pricing available. Follow [@mikenikles](https://twitter.com/mikenikles) on Twitter for updates._

## The team

### Mike Nikles

I'm Mike, [@mikenikles](https://twitter.com/mikenikles) on Twitter. I wrote the "[Cloud Native Web Development](https://www.mikenikles.com/cloud-native-web-development)" book, created the "[Cloud Native Development with Tailwind, Google Cloud and Firebase](https://www.educative.io/courses/cloud-native-development)" course and published the "[Full Stack Web Development in the Cloud](https://www.youtube.com/watch?v=OUzaUJ3gEug)" video course with 120,000+ views in the first three weeks after its launch.

### You?

Please contact me on Twitter [@mikenikles](https://twitter.com/mikenikles) if all this sounds interesting to you.

## Architecture

### Template course monorepo

A private monorepo contains the code for all available course modules. Individual module directories also contain the necessary teaching assets, such as lessons, videos, diagrams, etc.

The repo is available at [WebstoneHQ/courses](https://github.com/WebstoneHQ/courses) (private).

The directory structure looks as follows:

```
.
├── backend
│   ├── graphql-sveltekit-postgres
│   ├── rest-rust-planetscale
│   └── rest-sveltekit-mysql
├── package.json
└── web
    ├── react-css-rest
    ├── react-styledcomponents-react
    ├── react-tailwindcss-graphql
    ├── svelte-css-rest
    └── svelte-tailwindcss-graphql
```

#### `package.json`

The root-level `package.json` file contains scripts to validate all possible BYOC combinations, generators to add new modules, etc.

### Student course monorepo

The template for this repository is available at [./templates/student-repo](./templates/student-repo).

When a student builds their own curriculum, a new monorepo is created in a git hosting provider of their choice with the following structure.

```
.
├── backend
│   └── rest-sveltekit-mysql
├── config.yaml
├── package.json
└── web
    └── svelte-tailwindcss-rest
```

The above directory structure matches the following curriculum:

- _Web_: Svelte
- _Styles_: Tailwind CSS
- _API_: Rest
- _Backend_: SvelteKit
- _Database_: MySQL

#### `config.yaml`

The `config.yaml` file for the above curriculum looks as follows:

```yaml
stack:
  web: "svelte"
  styles: "tailwindcss"
  api: "rest"
  backend: "sveltekit"
  database: "mysql"
deployment:
  web: "vercel"
  backend: "vercel"
  database: "railway"
```

#### `package.json`

The root-level `package.json` file contains `scripts` to start development servers, run tests, etc. Depending on the configured values in `config.yaml`, the correct development servers are started.

#### Additional modules

Students may choose to learn about additional course modules. For example, a student may decide they want to learn about a React web app styled with plain CSS. Given the example above, the student course repository would be extended with a `web/react-css-rest` directory.

The `config.yaml` file can be adjusted accordingly:

```yaml
stack:
  web: "react"
  styles: "css"
  api: "rest"
  backend: "sveltekit"
  database: "mysql"
deployment:
  web: "vercel"
  backend: "vercel"
  database: "railway"
```

### Modules

Individual modules contain learning content such as lessons, videos, quizzes, etc. They also contain the source code for each lesson. A module's directory structure looks as follows:

```
├── config.yaml
├── package.json
├── README.md
└── lessons
    ├── 1
    │   ├── config.yaml
    │   ├── content.md
    │   ├── assets
    │   ├── quizzes
    │   └── source
    └── 2
        └── same-structure-as-lesson-1
```

#### `config.yaml`

A course module's configuration lives in a `config.yaml` file at the root of the module.

```yaml
name: ""
```

#### `package.json`

A module's `package.json` file contains scripts to generate new lessons, validate the integrity of the module, publish / update a module, etc.

# Open questions

We are in an early stage and not everything has been figured out.

### What does the most minimal usable product look like?

In order to get people excited about the product, we need a demo. This is also the easiest way I can think of to convey the concept of BYOC.

My current thinking (Jan 5, 2021) is:

- A Todo app (reason: easy to find existing examples, shorter time to develop)
- Svelte and React _web_ modules
- A CSS _styles_ module only
- A REST _api_ module only
- The _backend_ & _database_ modules are hosted and not available to choose from
- Deployment on Vercel (_web_, _api_, _backend_) and Railway (for the db)

### What do we call _web_, _styles_, _api_, _backend_, _database_?

My first thought is "tier". Although, the "styles tier" feels awkward.

### What's a better name for _backend_?

- Services? Application or business (layer)? Server?
- Drop "backend" and combine it with the _api_ modules? Every backend module is tightly coupled with one api module anyway.

### Where / how do we configure module compatibility?

Do we even need that? If all modules adhere to "strict module guidelines" (see above), any module may be compatible with any other module. However, a React _web_ module with a Nuxt.js _backend_ module may not be the best idea, but may technically work 🤔?! Maybe we show a warning instead, highly recommending not to do that (in that case we do need a compatibility matrix).

### How do we mock modules without giving away the source for free?

Each lesson is taught in the context of the overall application. If a student only chooses to learn about the _web_ and _styles_ modules, we need a way to provide them with an API endpoint, a backend and a database so they can develop their web application. Likewise, if a student only wants to learn about _API_ & _backend_ modules, we need to provide a functioning _web_ & _styles_ modules

**Hosted option**

We host versions of certain _api-backend_ combinations and can use a single hosted _database_. When a student creates a curriculum, the platform provisions the _api-backend-dsatabase_ combination and provides the student with the API endpoint to use in their web module.

**_Pros_**:

- We can completely isolate the code and do not expose any of the _api-backend-database_ modules to students who didn't add them to their curriculum.

**_Cons_**:

- An internet connection is required for the _web_ module to connect to the API.
- Incurs hosting costs, although we can keep that relatively low with something like Vercel & Railway since there will be very low traffic.

**Docker container(s)**

We provide the modules not included in the curriculum as a docker container (or multiple containers?).

**_Pros_**:

- No internet connection is required.
- No hosting costs.

**_Cons_**:

- Requires Docker setup locally (mitigated on Gitpod as it won't be an issue there)
- Exposure of the source code for modules that are not part of the curriculum
