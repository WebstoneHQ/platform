<script lang="ts">
  import Byoc from "$lib/components/byoc/index.svelte";
  import Faq from "$lib/components/faq.svelte";
  import ModulesMarquee from "$lib/components/modules-marquee.svelte";
  import Link from "$lib/components/link.svelte";

  const faqs = [
    {
      q: "Can I get a refund on this if it's not for me?",
      a: "Absolutely! If you cancel within the first 14 days, we will fully refund your purchase.",
    },
    {
      q: "For how long will I benefit from the 70% preorder discount?",
      a: "Forever - or until you cancel your subscription. You can always subscribe again, but will pay the full price at that time.",
    },
    {
      q: "How is this different from Udemy, freeCodeCamp, Educative, etc.?",
      a: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil accusantium eum praesentium commodi eos, voluptate similique, nulla ad vel unde, recusandae iste minima quibusdam! Velit, quos. Quod earum maiores aliquam.",
    },
    {
      q: "What level of experience is required?",
      a: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil accusantium eum praesentium commodi eos, voluptate similique, nulla ad vel unde, recusandae iste minima quibusdam! Velit, quos. Quod earum maiores aliquam.",
    },
  ];
</script>

<div class="">
  <div class="mx-auto max-w-5xl md:mt-36">
    <h1
      class="mt-12 text-center text-6xl font-bold text-[#1d1d1f] dark:text-white md:text-8xl md:font-extrabold"
    >
      Learn with context.
    </h1>
    <p class="mt-4 text-center text-3xl text-[#6e6d7a]">
      Develop full-stack web applications, end-to-end
    </p>
    <div class="mt-16 px-4 md:px-0">
      <Byoc />
    </div>
  </div>

  <div class="mx-auto mt-12 max-w-5xl grayscale">
    <ModulesMarquee />
    <p class="text-center text-3xl text-[#6e6d7a]">
      We regularly release new modules
    </p>
  </div>

  <div
    class="mx-auto mt-20 bg-[#272727] py-44 text-[#fafafa] dark:bg-white dark:text-slate-900"
  >
    <div class="mx-auto max-w-5xl">
      <div class="px-4 md:grid md:grid-cols-2 md:gap-20 md:px-0">
        <div>
          <h2 class="text-4xl font-bold">
            Learning how to develop software is broken
          </h2>
          <p class="mt-5 text-[#d6d1ff] dark:text-[#6e6d7a]">
            Tens of thousands of videos, tutorials, blog posts, articles, etc.
            are readily available, yet how do you know what is worth your time?
          </p>
          <p class="mt-5 text-[#d6d1ff] dark:text-[#6e6d7a]">
            Webstone changes how we educate full-stack web developers. Each
            lesson is interactive and contains a mix of text, short videos, code
            samples, hands-on exercises and quizzes to reinforce learning.
          </p>
        </div>
        <div>
          <h3 class="mt-5 font-bold md:mt-0">
            A curriculum that changes with you
          </h3>
          <p class="mt-1 text-[#d6d1ff] dark:text-[#6e6d7a]">
            We're always adding more modules, which means that an investment in
            Webstone is an investment in continuous learning.
          </p>
          <h3 class="mt-5 font-bold">Build a web application end-to-end</h3>
          <p class="mt-1 text-[#d6d1ff] dark:text-[#6e6d7a]">
            Instead of a Tetris game, a weather widget and a Todo app, you focus
            on individual lessons that are part of one real-world application.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto mt-32 max-w-5xl px-4 md:px-0">
    <h2 class="text-4xl font-bold md:font-extrabold">
      Frequently asked questions
    </h2>
    <div class="mt-14 md:grid md:grid-cols-2 md:gap-20">
      {#each faqs as { q, a }}
        <Faq q="{q}" a="{a}" />
      {/each}
    </div>
  </div>

  <div
    class="mx-auto mt-32 max-w-5xl px-4 md:grid md:grid-cols-2 md:gap-20 md:px-0"
  >
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
      <ul class="mt-5 space-y-2">
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
  </div>

  <div class="mx-auto mt-32 max-w-5xl px-4 md:px-0">
    <h2 class="text-4xl font-bold md:font-extrabold">Sign up for updates</h2>
    <div class="mt-4 md:grid md:grid-cols-2 md:gap-20">
      <p class="">
        Stay up to date with new modules, courses, and Webstone Education
        product news.
      </p>
      <div class="mt-4 md:mt-0">
        <div class="flex justify-center">
          <div class="relative">
            <input
              type="email"
              required
              name="email"
              class="w-80 rounded-3xl bg-transparent py-4 focus:shadow focus:outline-none md:w-[32rem] md:py-6 md:text-lg"
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
      </div>
    </div>
  </div>
</div>
