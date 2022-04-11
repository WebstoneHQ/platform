import type { RequestHandler } from "@sveltejs/kit";

import { Octokit } from "octokit";

import { readFile, readFileYaml } from "$lib/github-graphql-queries";

type LessonConfig = {
  description: string;
  id: string;
  name: string;
}

const octokit = new Octokit({ auth: "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" });

const cache = new Map<string, string>();

export const get: RequestHandler = async ({params}) => {
  const cacheKey = `${params.courseid}-${params.lessonid}`;
  if (cache.has(cacheKey)) {
    return {
      body: cache.get(cacheKey)
    }
  }

  // const lessonConfig = await readFileYaml<LessonConfig>(octokit, `framework/${params.courseid}/lessons/${params.lessonid}/config.yaml`)
  const lessonContent = await readFile(octokit, `framework/${params.courseid}/lessons/${params.lessonid}/README.md`)

  // const course: Course = {
  //   description: courseConfig.description,
  //   id: courseConfig.id,
  //   lessons: courseLessonConfigFiles,
  //   name: courseConfig.name,
  //   stack: {
  //     web: courseConfig.id.split("-")[0],
  //     styles: courseConfig.id.split("-")[1],
  //     apitype: courseConfig.id.split("-")[2],
  //     api: courseConfig.id.split("-").length === 4 ? courseConfig.id.split("-")[0] : courseConfig.id.split("-")[3],
  //     database: courseConfig.id.split("-")[courseConfig.id.split("-").length - 1],
  //   },
  // }
  // cache.set(cacheKey, course);

  return {
    body: lessonContent
  }
}
