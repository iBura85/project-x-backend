import { Inject } from '@nestjs/common';

export const prefixesForLoggers: string[] = new Array<string>();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Logger(prefix = '') {
  if (!prefixesForLoggers.includes(prefix)) {
    prefixesForLoggers.push(prefix);
  }
  return Inject(`LoggerService${prefix}`);
}
