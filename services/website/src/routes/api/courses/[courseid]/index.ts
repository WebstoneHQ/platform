import type { RequestHandler } from "@sveltejs/kit";

import { Octokit } from "octokit";

import {
  readFile,
  readFileYaml,
  readLessonConfigFiles,
} from "$lib/github/graphql-api";

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

  const githubApiCalls = await Promise.allSettled([
    readFile(
      octokit,
      `courses/todo-app/framework/${params.courseid}/README.md`
    ),
    readFileYaml<CourseConfig>(
      octokit,
      `courses/todo-app/framework/${params.courseid}/config.yaml`
    ),
    readLessonConfigFiles(
      octokit,
      `courses/todo-app/framework/${params.courseid}/lessons`
    ),
  ]);
  const [
    courseReadmeResult,
    courseConfigResult,
    courseLessonConfigFilesResult,
  ] = githubApiCalls;

  if (
    courseReadmeResult.status === "fulfilled" &&
    courseConfigResult.status === "fulfilled" &&
    courseLessonConfigFilesResult.status === "fulfilled"
  ) {
    const { value: courseReadme } = courseReadmeResult;
    const { value: courseConfig } = courseConfigResult;
    const { value: courseLessonConfigFiles } = courseLessonConfigFilesResult;

    const course: Course = {
      description: courseReadme,
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
  }

  console.error({
    courseReadmeResult: courseReadmeResult.status,
    courseConfigResult: courseConfigResult.status,
    courseLessonConfigFilesResult: courseLessonConfigFilesResult.status,
  });
  return {
    status: 404,
  };
};
