<script lang="ts">
  import { enhance } from "$lib/actions/form";
  import Byoc from "$lib/components/byoc/index.svelte";
  import Link from "$lib/components/link.svelte";

  const signUpSuccessful = async (_, form: HTMLFormElement) => {
    form.reset();
    form.style.setProperty("--success", "visible");
  };
</script>

<style>
  form {
    --success: hidden;
  }
</style>

<svelte:head>
  <title>Learn full-stack web development | Webstone Education</title>
  <meta
    name="description"
    content="Webstone Education is on a mission to simplify full-stack web development education."
  />
  <meta
    property="og:title"
    content="Learn full-stack web development | Webstone Education"
  />
  <meta
    property="og:description"
    content="Webstone Education is on a mission to simplify full-stack web development education."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://webstone.app" />
  <meta property="og:image" content="https://webstone.app/og-image.png" />
</svelte:head>

<div
  class="bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-200"
>
  <main>
    <!-- Hero section -->
    <div class="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
      <div
        class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8"
      >
        <div>
          <!-- <div>
            <img class="h-11 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500" alt="Workflow">
          </div> -->
          <div class="mt-20">
            <!-- <div>
              <a href="#" class="inline-flex space-x-4">
                <span class="rounded bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-500 tracking-wide uppercase">
                  What's new
                </span>
                <span class="inline-flex items-center text-sm font-medium text-rose-500 space-x-1">
                  <span>Just shipped version 0.1.0</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </a>
            </div> -->
            <div class="mt-6 sm:max-w-xl">
              <h1
                class="bg-gradient-to-br from-slate-900 to-orange-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-orange-500 dark:to-white sm:text-5xl"
              >
                Learn full-stack web development
              </h1>
              <p class="mt-6 text-xl">
                The only comprehensive full-stack learning environment, from
                HTML to databases and anything in-between.
              </p>
            </div>
            <form
              action="/api/sign-up.json"
              method="post"
              use:enhance="{{
                result: signUpSuccessful,
              }}"
              class="mt-12"
            >
              <div class="sm:flex sm:w-full sm:max-w-lg">
                <div class="min-w-0 flex-1">
                  <label for="hero-email" class="sr-only">Email address</label>
                  <input
                    id="hero-email"
                    type="email"
                    name="email"
                    class="block w-full rounded-md border border-gray-300 px-5 py-3 text-base placeholder-gray-500 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    class="block w-full rounded-md border border-transparent bg-orange-500 px-5 py-3 text-base font-medium text-slate-900 shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
                    >Notify me</button
                  >
                </div>
              </div>
              <div class="mt-4" style="visibility: var(--success);">
                <p>Thank you, we will send you updates.</p>
              </div>
            </form>
            <!-- <div class="mt-6">
              <div class="inline-flex items-center divide-x divide-gray-300">
                <div class="flex-shrink-0 flex pr-5">
                  {#each Array(5) as star}
                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  {/each}
                </div>
                <div class="min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 sm:py-3"><span class="font-medium text-gray-900">Rated 5 stars</span> by over <span class="font-medium text-rose-500">500 beta users</span></div>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <!-- <div class="hidden sm:block sm:mx-auto sm:max-w-3xl sm:px-6">
        <div
          class="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
        >
          <div>
            <div
              class="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"
            ></div>
            <svg
              class="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
              width="404"
              height="392"
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="392"
                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
            </svg>
          </div>
          <div class="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
            <img class="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none" src="https://tailwindui.com/img/component-images/task-app-rose.jpg" alt="">
          </div>
        </div>
      </div>
    </div> -->

      <div class="mt-32">
        <div
          class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div class="lg:grid lg:grid-cols-2 lg:items-center lg:gap-24">
            <div>
              <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Build your own curriculum
              </h2>
              <p class="mt-6 max-w-3xl text-lg leading-7">
                Select your preferred technologies and we will create a
                personalised course for you.
              </p>
              <p class="mt-6 max-w-3xl text-lg leading-7">
                With Webstone, you are in control of your full-stack web
                development learning journey.
              </p>
              <p class="mt-6 max-w-3xl text-lg leading-7">
                Learn exactly what is valuable to you. You can come back at any
                time and configure a new curriculum. When you do so, the new
                lessons will be added to your existing student repository.
              </p>
              <p class="mt-6 max-w-3xl text-lg leading-7">
                Until we launch Webstone Education, you become automatically
                eligible for the <strong>early adopter pricing</strong>
                if you build your curriculum now and provide your email address at
                the end.
              </p>
            </div>
            <div class="mt-12 lg:mt-0">
              <Byoc />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-32">
        <div
          class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
            One application, many course modules
          </h2>
          <div class="lg:grid lg:grid-cols-2 lg:items-center lg:gap-24">
            <div>
              <p class="mt-6 max-w-3xl text-lg leading-7">
                You develop a single full-stack web application, end-to-end!
              </p>
              <p class="mt-6 max-w-3xl text-lg leading-7">
                Instead of a Tetris game, a weather widget and a Todo app, you
                focus on individual lessons that are part of one real-world
                application.
              </p>
              <p class="mt-6 max-w-3xl text-lg leading-7">
                The best part: You, and you alone decide which modules you want
                to learn about and which technology stack interests you most.
              </p>
              <p class="mt-6 max-w-3xl text-lg leading-7">
                Read on and configure your personal curriculum 👇️.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonial/stats section -->
      <div class="relative mt-20">
        <div
          class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8"
        >
          <div class="relative sm:py-16 lg:py-0">
            <div
              aria-hidden="true"
              class="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
            >
              <!-- <div
              class="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72"
            ></div> -->
              <!-- <svg
              class="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
              width="404"
              height="392"
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="392"
                fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"></rect>
            </svg> -->
            </div>
            <div
              class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20"
            >
              <!-- Testimonial card-->
              <div
                class="relative overflow-hidden rounded-2xl pt-64 pb-10 shadow-xl"
              >
                <img
                  class="absolute inset-0 h-full w-full object-cover"
                  src="mike-profile.jpg"
                  alt="A headshot of Mike Nikles"
                />
                <div
                  class="absolute inset-0 bg-orange-500 mix-blend-multiply"
                ></div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-600 opacity-0"
                ></div>
                <div class="relative px-8">
                  <!-- <div>
                  <img class="h-12" src="https://tailwindui.com/img/logos/workcation.svg?color=white" alt="Workcation">
                </div> -->
                  <blockquote class="mt-8">
                    <div
                      class="relative text-lg font-medium text-white md:flex-grow"
                    >
                      <svg
                        class="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-orange-400"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path
                          d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
                        ></path>
                      </svg>
                      <p class="relative">
                        Webstone Education combines the best of two decades as a
                        software engineer, educator and author.
                      </p>
                    </div>

                    <footer class="mt-4">
                      <p class="text-base font-semibold text-orange-200">
                        Mike Nikles, Founder at Webstone
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          <div
            class="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0"
          >
            <!-- Content area -->
            <div class="pt-12 sm:pt-16 lg:pt-20">
              <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
                On a mission to simplify full-stack web development education
              </h2>
              <div class="mt-6 space-y-6">
                <p class="text-lg">
                  Learning how to develop software is broken. Tens of thousands
                  of videos, tutorials, blog posts, articles, etc. are readily
                  available, yet how do you know what is worth your time?
                </p>
                <p class="text-lg leading-7">
                  The <strong>Webstone Education Platform</strong> changes how
                  we educate full-stack web developers. Each lesson is
                  <strong>interactive</strong> and contains a
                  <strong
                    >mix of text, short videos, code samples, hands-on exercises</strong
                  >
                  and <strong>quizzes</strong> to reinforce learning.
                </p>
                <p class="text-lg leading-7">
                  Mike has been a full-stack web developer for 20+ years. He is
                  also the author and creator of the following books & courses:
                </p>
                <ul>
                  <li>
                    <Link
                      href="https://www.mikenikles.com/cloud-native-web-development"
                      >📚️ Cloud Native Web Development</Link
                    >
                  </li>
                  <li>
                    <Link
                      href="https://mikenikles.gumroad.com/l/a-smart-guide-for-your-career-as-a-software-engineer"
                      >📚️ A Smart Guide for Your Career as a Software Engineer</Link
                    >
                  </li>
                  <li>
                    <Link
                      href="https://www.educative.io/courses/cloud-native-development"
                      >🧑‍🎓 Cloud Native Development with Tailwind, Google
                      Cloud and Firebase</Link
                    >
                  </li>
                  <li>
                    <Link href="https://www.youtube.com/watch?v=OUzaUJ3gEug"
                      >🧑‍🎓 Full Stack Web Development in the Cloud</Link
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Stats section -->
            <!-- <div class="mt-10">
            <dl class="grid grid-cols-2 gap-x-4 gap-y-8">
              <div class="border-t-2 border-gray-100 pt-6">
                <dt class="text-base font-medium text-gray-500">Founded</dt>
                <dd class="text-3xl font-extrabold tracking-tight text-gray-900">2021</dd>
              </div>

              <div class="border-t-2 border-gray-100 pt-6">
                <dt class="text-base font-medium text-gray-500">Employees</dt>
                <dd class="text-3xl font-extrabold tracking-tight text-gray-900">5</dd>
              </div>

              <div class="border-t-2 border-gray-100 pt-6">
                <dt class="text-base font-medium text-gray-500">Beta Users</dt>
                <dd class="text-3xl font-extrabold tracking-tight text-gray-900">521</dd>
              </div>

              <div class="border-t-2 border-gray-100 pt-6">
                <dt class="text-base font-medium text-gray-500">Raised</dt>
                <dd class="text-3xl font-extrabold tracking-tight text-gray-900">$25M</dd>
              </div>
            </dl>
            <div class="mt-10">
              <a href="#" class="text-base font-medium text-rose-500">
                Learn more about how we're changing the world&nbsp&rarr;
              </a>
            </div>
          </div> -->
          </div>
        </div>
      </div>

      <!-- Logo cloud section -->
      <!-- <div class="mt-32">
      <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <div class="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div>
            <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Backed by world-renowned investors
            </h2>
            <p class="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames senectus vitae.
            </p>
            <div class="mt-6">
              <a href="#" class="text-base font-medium text-rose-500">
                Meet our investors and advisors&nbsp&rarr;
              </a>
            </div>
          </div>
          <div class="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
            <div class="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img class="max-h-12" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor">
            </div>

            <div class="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img class="max-h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage">
            </div>

            <div class="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img class="max-h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple">
            </div>

            <div class="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img class="max-h-12" src="https://tailwindui.com/img/logos/laravel-logo-gray-400.svg" alt="Laravel">
            </div>

            <div class="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img class="max-h-12" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit">
            </div>

            <div class="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <img class="max-h-12" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation">
            </div>
          </div>
        </div>
      </div>
    </div> -->

      <!-- CTA section -->
      <div class="relative mt-24 sm:mt-32 sm:py-16">
        <div aria-hidden="true" class="hidden sm:block">
          <!-- <div
          class="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl"
        ></div>
        <svg
          class="absolute top-8 left-1/2 -ml-3"
          width="404"
          height="392"
          fill="none"
          viewBox="0 0 404 392"
        >
          <defs>
            <pattern
              id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"></rect>
            </pattern>
          </defs>
          <rect
            width="404"
            height="392"
            fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"></rect>
        </svg> -->
        </div>
        <div
          class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div
            class="relative overflow-hidden rounded-2xl bg-orange-500 px-6 py-10 shadow-xl sm:px-12 sm:py-20"
          >
            <div
              aria-hidden="true"
              class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                class="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  class="text-rose-400 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                ></path>
                <path
                  class="text-rose-600 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                ></path>
              </svg>
            </div>
            <div class="relative">
              <div class="sm:text-center">
                <h2
                  class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                >
                  Get notified when we&rsquo;re launching.
                </h2>
                <p class="mx-auto mt-6 max-w-2xl text-lg text-rose-100">
                  Follow us on Twitter <a
                    href="https://twitter.com/webstonehq"
                    target="_blank"
                    rel="noreferrer">@webstonehq</a
                  > or provide your email address below for updates and early bird
                  pricing.
                </p>
              </div>
              <form
                action="/api/sign-up.json"
                method="post"
                use:enhance="{{
                  result: signUpSuccessful,
                }}"
                class="mt-12"
              >
                <div class="sm:mx-auto sm:flex sm:max-w-lg">
                  <div class="min-w-0 flex-1">
                    <label for="cta-email" class="sr-only">Email address</label>
                    <input
                      id="cta-email"
                      type="email"
                      name="email"
                      class="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div class="mt-4 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      class="block w-full rounded-md border border-transparent bg-gray-900 px-5 py-3 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10"
                      >Notify me</button
                    >
                  </div>
                </div>
                <div
                  class="mt-4 text-center text-white"
                  style="visibility: var(--success);"
                >
                  <p>Thank you, we will send you updates.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer section -->
  <footer class="mt-24 sm:mt-12">
    <div
      class="mx-auto max-w-md overflow-hidden py-12 px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <!-- <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
        <div class="px-5 py-2">
          <a href="#" class="text-base text-gray-400 hover:text-gray-300">
            About
          </a>
        </div>

        <div class="px-5 py-2">
          <a href="#" class="text-base text-gray-400 hover:text-gray-300">
            Blog
          </a>
        </div>

        <div class="px-5 py-2">
          <a href="#" class="text-base text-gray-400 hover:text-gray-300">
            Jobs
          </a>
        </div>

        <div class="px-5 py-2">
          <a href="#" class="text-base text-gray-400 hover:text-gray-300">
            Press
          </a>
        </div>

        <div class="px-5 py-2">
          <a href="#" class="text-base text-gray-400 hover:text-gray-300">
            Accessibility
          </a>
        </div>

        <div class="px-5 py-2">
          <a href="#" class="text-base text-gray-400 hover:text-gray-300">
            Partners
          </a>
        </div>
      </nav> -->
      <div class="mt-8 flex justify-center space-x-6">
        <!-- <a href="#" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Facebook</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
          </svg>
        </a>

        <a href="#" class="text-gray-400 hover:text-gray-300">
          <span class="sr-only">Instagram</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
          </svg>
        </a> -->

        <a
          href="https://twitter.com/webstonehq"
          target="_blank"
          rel="noreferrer"
          class="hover:text-gray-300"
        >
          <span class="sr-only">Twitter</span>
          <svg
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
            ></path>
          </svg>
        </a>

        <a
          href="https://github.com/WebstoneHQ/platform"
          target="_blank"
          rel="noreferrer"
          class="hover:text-gray-300"
        >
          <span class="sr-only">GitHub</span>
          <svg
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"></path>
          </svg>
        </a>

        <a
          href="https://discord.gg/EzJDBT6uRv"
          target="_blank"
          rel="noreferrer"
          class="hover:text-gray-300"
        >
          <span class="sr-only">Discord</span>
          <svg
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 71 55"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="71" height="55" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </a>
      </div>
      <p class="mt-8 text-center text-base">
        &copy; {new Date().getFullYear()} Webstone Technologies, Inc. All rights
        reserved.
      </p>
    </div>
  </footer>
</div>
