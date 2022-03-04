<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = ({ params }) => {
    const { courseid, lessonid } = params;

    // TODO: Check if the authenticated student has purchased this course. If not, redirect to ../ (course page) and display a message to purchase the course

    return {
      props: {
        courseid,
        lessonid,
      },
    };
  };
</script>

<script lang="ts">
  export let courseid: string;
  export let lessonid: string;
</script>

<p>
  TODO: Render lesson Markdown content for course {courseid} and lesson {lessonid}
</p>
