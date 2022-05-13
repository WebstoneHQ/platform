import type { RequestHandler } from "@sveltejs/kit";

import { Octokit } from "octokit";

import {
  readFileYaml,
  readLessonConfigFiles,
} from "$lib/github-graphql-queries";

type CourseConfig = {
  description: string;
  id: string;
  name: string;
};

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const cache = new Map<string, Course>();

export const get: RequestHandler = async ({ params }) => {
  if (cache.has(params.courseid)) {
    return {
      body: JSON.stringify(cache.get(params.courseid)),
    };
  }

  const courseConfig = await readFileYaml<CourseConfig>(
    octokit,
    `framework/${params.courseid}/config.yaml`
  );
  const courseLessonConfigFiles = await readLessonConfigFiles(
    octokit,
    `framework/${params.courseid}/lessons`
  );

  const course: Course = {
    description: courseConfig.description,
    id: courseConfig.id,
    lessons: courseLessonConfigFiles,
    name: courseConfig.name,
    stack: {
      web: courseConfig.id.split("-")[0],
      styles: courseConfig.id.split("-")[1],
      apitype: courseConfig.id.split("-")[2],
      api:
        courseConfig.id.split("-").length === 4
          ? courseConfig.id.split("-")[0]
          : courseConfig.id.split("-")[3],
      database:
        courseConfig.id.split("-")[courseConfig.id.split("-").length - 1],
    },
  };
  cache.set(params.courseid, course);

  return {
    body: JSON.stringify(course),
  };
};
