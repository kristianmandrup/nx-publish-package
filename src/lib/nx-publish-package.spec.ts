import { nxPublishPackage } from './publish';

describe('nxPublishPackage', () => {
  it('should work', () => {
    expect(nxPublishPackage()).toEqual('publish');
  });
});
