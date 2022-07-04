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
  const cacheKey = `${params.courseid}-${params.stackgroup}-${params.stack}`;
  if (cache.has(cacheKey)) {
    return {
      body: JSON.stringify(cache.get(cacheKey)),
    };
  }

  const githubApiCalls = await Promise.allSettled([
    readFile(
      octokit,
      "WebstoneHQ",
      `c-${params.courseid}-${params.stackgroup}-${params.stack}`,
      `README.md`
    ),
    readFileYaml<CourseConfig>(
      octokit,
      "WebstoneHQ",
      `c-${params.courseid}-${params.stackgroup}-${params.stack}`,
      `config.yaml`
    ),
    readLessonConfigFiles(
      octokit,
      "WebstoneHQ",
      `c-${params.courseid}-${params.stackgroup}-${params.stack}`,
      `lessons`
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
      id: params.courseid,
      lessons: courseLessonConfigFiles,
      name: courseConfig.name,
      stack: params.stack,
      stackgroup: params.stackgroup,
    };
    cache.set(cacheKey, course);

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
