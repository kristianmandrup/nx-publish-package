import { PublishPkgExecutorSchema } from './schema';
import executor from './executor';
import { ExecutorContext } from '@nx/devkit';

const options: PublishPkgExecutorSchema = {
  dist: '',
};

describe('PublishPkg Executor', () => {
  it('can run', async () => {
    const context: ExecutorContext = {
      root: '.',
      cwd: process.cwd(),
      isVerbose: false,
    };
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
