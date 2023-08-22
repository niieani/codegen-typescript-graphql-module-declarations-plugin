import { validate } from './main'

describe('plugin', () => {
  it('imports', () => {
    expect(() =>
      (validate as unknown as any)(undefined, undefined, undefined, 'file.ts'),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Plugin "codegen-typescript-graphql-module-declarations" requires extension to be ".d.ts"!"`,
    )
  })
})
