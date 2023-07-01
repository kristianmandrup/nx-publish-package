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

  if (typeof projectName === 'undefined') {
    logger.error(new Error('Project name is not defined.'));

    process.exit(1);
  }

  const isInWorkspace = isProjectInWorkspace(context, projectName);

  if (!isInWorkspace) {
    console.log(`Project ${projectName} is not in the workspace.`);
    process.exit(1);
  }

  const projectConfig = context.workspace.projects[context.projectName];
  const projectBuildTargetFolder =
    projectConfig.targets['build'].options.outputPath;
  const buildTargetFolder =
    options.dist || projectBuildTargetFolder || `dist/${projectName}`;
  const packageManager = determinePackageManager(context) || 'npm';
  const currentWorkingDir = context.cwd;
  const distProjPath = path.join(currentWorkingDir, buildTargetFolder);

  execSync(
    `cd ${distProjPath} && ${packageManager} publish --newVersion && cd ${currentWorkingDir}`,
    {
      stdio: 'inherit',
    }
  );

  return { success: true };
}
