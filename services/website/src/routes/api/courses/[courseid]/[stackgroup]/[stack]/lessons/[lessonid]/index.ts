import type { RequestHandler } from "@sveltejs/kit";

// import { Octokit } from "octokit";

import { readFile } from "$lib/github/graphql-api";

// const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const cache = new Map<string, string>();

export const get: RequestHandler = async ({ params }) => {
  const cacheKey = `${params.courseid}-${params.lessonid}`;
  if (cache.has(cacheKey)) {
    return {
      body: cache.get(cacheKey),
    };
  }

  const idDigitsMatch = params.lessonid.match(/^(\d{2}).?(\d{2})/);
  const lessonDirName = `[...${idDigitsMatch[1]}_${
    idDigitsMatch[2]
  }]${params.lessonid.substring("xx-xx-".length)}`;
  const lessonContent = await readFile(
    "WebstoneHQ",
    `c-${params.courseid}-${params.stackgroup}-${params.stack}`,
    `lessons/${lessonDirName}/README.md`
  );

  return {
    body: lessonContent,
  };
};
