# codegen-typescript-graphql-module-declarations-plugin

This [graphql-code-generator](https://graphql-code-generator.com/) plugin is based on the [TypeScript GraphQL Files Modules](https://graphql-code-generator.com/docs/plugins/typescript-graphql-files-modules), but generates typed document nodes, using the types generated earlier by [TypedDocumentNode](https://graphql-code-generator.com/docs/plugins/typed-document-node) plugin.

You need to run graphql-code-generator with the TypedDocumentNode plugin first and set `typedDocumentNodeModule` option to the module path of the generated file.

For configuration options see [index.ts](./src/index.ts).

This plugin generates TypeScript typings for `.graphql` files containing GraphQL documents, which later on can be consumed using [`graphql-tag/loader`](https://github.com/apollographql/graphql-tag#webpack-preprocessing-with-graphql-tagloader) or use `string` types if you will use the operations as raw strings, and get type-check and type-safety for your imports. This means that any time you import objects from `.graphql` files, your IDE will provide auto-complete.

This plugin also handles `.graphql` files containing multiple GraphQL documents, and name the imports according to the operation name.

> ⚠ Fragments are not generated with named imports, only as default imports, due to `graphql-tag/loader` behavior.
