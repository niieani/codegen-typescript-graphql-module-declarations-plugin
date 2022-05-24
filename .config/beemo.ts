import type { ScaffoldConfig } from '@niieani/scaffold'

const config: ScaffoldConfig = {
  module: '@niieani/scaffold',
  drivers: ['babel', 'eslint', 'jest', 'prettier', 'typescript', 'webpack'],
  settings: {
    node: true,
    name: 'CodegenTypescriptGraphQLModuleDeclarationsPlugin',
    engineTarget: 'node',
    codeTarget: 'es2020',
  },
}

export default config
