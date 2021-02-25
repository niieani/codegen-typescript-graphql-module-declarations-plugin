/* eslint-disable @typescript-eslint/no-explicit-any */
import {validate} from '.'

test('imports', () => {
  expect(() =>
    ((validate as unknown) as any)(undefined, undefined, undefined, 'file.ts'),
  ).toThrow()
})
