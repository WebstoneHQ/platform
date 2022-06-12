<script lang="ts">
  import { enhance } from "$lib/actions/form";
  import Byoc from "$lib/components/byoc/index.svelte";
  import Container from "$lib/components/container.svelte";
  import Faq from "$lib/components/faq.svelte";
  import ModulesMarquee from "$lib/components/modules-marquee.svelte";
  import Link from "$lib/components/link.svelte";

  const faqs = [
    {
      q: "Can I get a refund on this if it's not for me?",
      a: "Absolutely! If you cancel within the first 14 days, we will fully refund your purchase.",
    },
    {
      q: "For how long will I benefit from the one-time pre-order price?",
      a: "Forever.",
    },
    {
      q: "How is this different from Udemy, freeCodeCamp, Educative, etc.?",
      a: "Webstone Education continuously sends you pull requests as frameworks evolve, best practices change and new modules are added to a course.",
    },
    {
      q: "What level of experience is required?",
      a: "This depends on the course. Generally, basic understanding of Javascript is expected. What's a function? What's an array?",
    },
  ];

  const signUpSuccessful = async (_: Response, form: HTMLFormElement) => {
    form.reset();
    form.style.setProperty("--success", "visible");
  };
</script>

<style>
  form {
    --success: hidden;
  }
</style>

<div class="mx-auto max-w-5xl pt-16 md:pt-24">
  <a href="/">
    <span class="sr-only">Webstone</span>
    <img
      src="/svg/webstone-logo.svg"
      alt="logo"
      title=""
      height="24px"
      width="148px"
      class="h-5 dark:invert md:h-6"
    />
  </a>
</div>

<Container class="mt-14 md:pt-32">
  <h1
    class="text-center text-6xl font-bold text-[#1d1d1f] dark:text-white md:text-8xl md:font-extrabold"
  >
    Learn with context.
  </h1>
  <p class="mt-4 text-center text-3xl text-[#6e6d7a]">
    Simplify your web dev education
  </p>
  <div class="mt-4 px-4 md:mt-16 md:px-0">
    <Byoc />
  </div>
</Container>

<div class="mx-auto mt-12 max-w-5xl grayscale">
  <ModulesMarquee />
  <p class="text-center text-2xl text-[#6e6d7a]">
    New modules added frequently
  </p>
</div>

<Container isFullWidth class="mt-20 bg-[#2A2840] py-44 text-white">
  <Container class="md:grid md:grid-cols-2 md:gap-20">
    <div>
      <h2 class="text-4xl font-bold">
        Learning how to develop software is broken
      </h2>
      <p class="mt-5">
        Tens of thousands of videos, tutorials, blog posts, articles, etc. are
        readily available, yet how do you know what is worth your time?
      </p>
      <p class="mt-5">
        Webstone Education changes how we educate full-stack web developers. You
        work on your own project, from start to end. It's a true full-stack web
        development experience where you learn how all the pieces fit together.
      </p>
    </div>
    <div>
      <img
        src="/svg/icon-hex.svg"
        class="mt-10 md:mt-0"
        alt="Two overlapping hexagons"
      />
      <h3 class="mt-5 font-bold">A curriculum that changes with you</h3>
      <p class="mt-1">
        We're always adding more modules, which means that an investment in
        Webstone is an investment in continuous learning.
      </p>
      <img
        src="/svg/icon-dev.svg"
        class="mt-10"
        alt="Two overlapping hexagons"
      />
      <h3 class="mt-5 font-bold">Build a web application end-to-end</h3>
      <p class="mt-1">
        Instead of a Tetris game, a weather widget and a blog, you focus on
        individual lessons that are part of one real-world application. No more
        guessing how the frontend may interact with the backend and the backend
        may persist data in a database - it's all covered.
      </p>
    </div>
  </Container>
</Container>

<Container class="mt-32">
  <h2 class="text-4xl font-bold md:font-extrabold">
    Frequently asked questions
  </h2>
  <div class="mt-14 md:grid md:grid-cols-2 md:gap-20">
    {#each faqs as { q, a }}
      <Faq q="{q}" a="{a}" />
    {/each}
  </div>
</Container>

<Container class="mt-32 md:grid md:grid-cols-2 md:gap-20">
  <img
    src="/mike-profile.jpg"
    alt="Mike's headshot"
    class="mx-auto h-60 w-80 rounded-xl object-cover"
  />
  <div>
    <h2 class="mt-2 font-bold text-[#503cff] md:mt-0">Your educator</h2>
    <h3 class="mt-2 text-4xl font-bold md:font-extrabold">Meet Mike</h3>
    <p class="mt-2 text-[#6e6d7a]">
      Mike has been a full-stack web developer for 20+ years. He is also the
      author and creator of the following books & courses:
    </p>
    <ul class="mt-5 list-inside list-disc space-y-2">
      <li>
        <Link href="https://www.mikenikles.com/cloud-native-web-development"
          >Cloud Native Web Development</Link
        >
      </li>
      <li>
        <Link
          href="https://mikenikles.gumroad.com/l/a-smart-guide-for-your-career-as-a-software-engineer"
          >A Smart Guide for Your Career as a Software Engineer</Link
        >
      </li>
      <li>
        <Link href="https://www.educative.io/courses/cloud-native-development"
          >Cloud Native Development with Tailwind, Google Cloud and Firebase</Link
        >
      </li>
      <li>
        <Link href="https://www.youtube.com/watch?v=OUzaUJ3gEug"
          >Full Stack Web Development in the Cloud</Link
        >
      </li>
    </ul>
  </div>
</Container>

<Container class="mt-32">
  <h2 class="text-4xl font-bold md:font-extrabold">Sign up for updates</h2>
  <div class="mt-4 md:grid md:grid-cols-2 md:gap-20">
    <p>
      Stay up to date with new modules, courses, and Webstone Education product
      news.
    </p>
    <div class="mt-4 md:mt-0">
      <form
        action="/api/sign-up.json"
        method="post"
        use:enhance="{{
          result: signUpSuccessful,
        }}"
      >
        <div class="flex justify-center">
          <div class="relative w-full">
            <input
              type="email"
              required
              name="email"
              class="w-full rounded-3xl bg-transparent py-4 focus:shadow focus:outline-none md:py-6 md:text-lg"
              placeholder="Enter your email"
            />
            <div class="absolute top-2 right-2">
              <button
                type="submit"
                class="rounded-3xl bg-[#503CFF] py-2 px-5 font-semibold text-white md:py-4 md:px-10 md:text-lg"
                >Subscribe</button
              >
            </div>
          </div>
        </div>
        <div class="mt-4" style="visibility: var(--success);">
          <p>Thank you, we will send you updates.</p>
        </div>
      </form>
    </div>
  </div>
</Container>
