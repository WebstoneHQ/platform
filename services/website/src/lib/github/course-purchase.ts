import { createRepositorySecret } from "$lib/github/helpers";
import {
  // dispatchRepositoryEvent,
  getActionsWorkflow,
} from "$lib/github/rest-api";

const addCourseDeployPrivateKeyToStudentRepo = async (gitHubUser: User) => {
  console.log(
    `Adding course deploy private key to student repo: ${gitHubUser.providerLogin}/webstone-education`
  );
  await createRepositorySecret(
    gitHubUser.providerLogin,
    "webstone-education",
    "COURSE_REPO_PRIVATE_DEPLOY_KEY_TODOAPP_FRAMEWORK_SVELTEKIT_CSS_REST_POSTGRESQL",
    process.env[
      "COURSE_REPO_PRIVATE_DEPLOY_KEY_TODOAPP_FRAMEWORK_SVELTEKIT_CSS_REST_POSTGRESQL"
    ]
  );
  console.log(
    `Added course deploy private key to student repo: ${gitHubUser.providerLogin}/webstone-education`
  );
};

// const provideCourseToStudent = async (
//   gitHubUser: User,
//   courseId: string,
//   stackgroup: string,
//   stack: string
// ) => {
//   console.log(
//     `Providing course ${courseId}-${stackgroup}-${stack} to student ${gitHubUser.providerLogin}`
//   );

//   const clientPayload = {
//     course: {
//       id: courseId,
//       stackgroup,
//       stack,
//       privateDeployKeyName:
//         `COURSE_REPO_PRIVATE_DEPLOY_KEY_${courseId}_${stackgroup}_${stack.replaceAll(
//           "-",
//           "_"
//         )}`.toUpperCase(),
//     },
//     git: {
//       branch: `new-course-${courseId}-${stackgroup}-${stack}`,
//       commitmessage: "Add new course",
//     },
//     pr: {
//       title: "New Course 🎉",
//       description: `Hi :wave:,

// Fantastic news, a new course is available. Please review this PR and when ready, merge it to update your own course content.`,
//     },
//   };
//   await dispatchRepositoryEvent(
//     clientPayload,
//     "on_new_content_available",
//     gitHubUser.providerLogin,
//     "webstone-education"
//   );
//   console.log(
//     `Provided course ${courseId}-${stackgroup}-${stack} to student ${gitHubUser.providerLogin}`
//   );
// };

const waitForActionsWorkflowToBeReady = async (gitHubUser: User) => {
  for (let i = 1; i <= 5; i++) {
    // Let's talk about this loop... enabling Actions on a newly created repo is an asynchronous operation.
    // This not-so-elegant loop waits for GitHub to complete that operation.
    // Yes, I agree. This should be cleaned up at some point.
    console.log(
      `Waiting for Actions workflow "new-content-available.yml" to be available in repository ${gitHubUser.providerLogin}/webstone-education... ${i}/5`
    );
    try {
      await getActionsWorkflow(
        gitHubUser.providerLogin,
        "webstone-education",
        "new-content-available.yml"
      );
      console.log(
        `Actions workflow "new-content-available.yml" is available in repository ${gitHubUser.providerLogin}/webstone-education.`
      );
      return;
    } catch (_error) {
      // We can ignore this
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.error(
    new Error(
      `Actions workflow "new-content-available.yml" is not available in repository ${gitHubUser.providerLogin}/webstone-education.`
    )
  );
};

export const purchaseCourse = async (
  gitHubUser: User
  // course: Partial<Course>,
) => {
  await addCourseDeployPrivateKeyToStudentRepo(gitHubUser);
  await waitForActionsWorkflowToBeReady(gitHubUser);

  // TOOD: Comment this out once `WebstoneHQ/webstone-education` is ready.
  // await provideCourseToStudent(
  //   gitHubUser,
  //   course.id,
  //   course.stackgroup,
  //   course.stack
  // );
};
