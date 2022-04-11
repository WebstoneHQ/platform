<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, params, stuff }) => {
    const { lessonid } = params;

    // TODO: Check if the authenticated student has purchased this course. If not, redirect to ../ (course page) and display a message to purchase the course
    if (stuff.course) {
      const response = await fetch(`/api/courses/${params.courseid}/lessons/${params.lessonid}/__data.json`);
      if (!response.ok) {
        return {
          error: new Error("Lesson not found"),
          status: 404,
        }
      }

      return {
        props: {
          lessonContent: await response.text(),
        }
      }
    }

    return {
      error: new Error("Course not found"),
      status: 404,
    }

  };
</script>

<script lang="ts">
  import {marked} from "marked";
  export let lessonContent: string;
</script>

<article class="prose lg:prose-xl dark:prose-invert">
  {@html marked.parse(lessonContent)}
</article>
