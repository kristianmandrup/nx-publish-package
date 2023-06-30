import { ExecutorContext, logger } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { PublishPkgExecutorSchema } from './schema';
import * as path from 'path';

function isProjectInWorkspace(
  context: ExecutorContext,
  projectName: string
): boolean {
  const projects = context.workspace.projects;

  return Object.keys(projects).includes(projectName);
}

function determinePackageManager(context: ExecutorContext): string {
  return context.nxJsonConfiguration.cli.packageManager;
}

export default async function runExecutor(
  options: PublishPkgExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const projectName = context.projectName;
  const projectConfig = context.workspace.projects[context.projectName];
  let buildTargetFolder = projectConfig.targets['build'].options.outputPath;
  buildTargetFolder = buildTargetFolder || options.dist || 'dist';
  const packageManager = determinePackageManager(context) || 'npm';

  if (typeof projectName === 'undefined') {
    logger.error(new Error('Project name is not defined.'));

    process.exit(1);
  }

  const isInWorkspace = isProjectInWorkspace(context, projectName);

  if (!isInWorkspace) {
    console.log(`Project ${projectName} is not in the workspace.`);

    process.exit(1);
  }

  const distProjPath = path.join(context.cwd, buildTargetFolder, projectName);

  execSync(`cd ${distProjPath} && ${packageManager} publish --newVersion`, {
    stdio: 'inherit',
  });

  return { success: true };
}
