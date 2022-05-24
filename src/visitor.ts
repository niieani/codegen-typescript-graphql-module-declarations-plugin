/* eslint-disable no-underscore-dangle */
// this file unfortunately does not exist in the published version of '@graphql-codegen/typed-document-node/visitor', so this is a copy

import autoBind from 'auto-bind'
import type {
  FragmentDefinitionNode,
  GraphQLSchema,
  OperationDefinitionNode,
  // eslint-disable-next-line node/no-unpublished-import
} from 'graphql'
import type { Types } from '@graphql-codegen/plugin-helpers'
import {
  ClientSideBasePluginConfig,
  ClientSideBaseVisitor,
  DocumentMode,
  LoadedFragment,
  RawClientSideBasePluginConfig,
} from '@graphql-codegen/visitor-plugin-common'

export class TypeScriptDocumentNodesVisitor extends ClientSideBaseVisitor<
  RawClientSideBasePluginConfig,
  ClientSideBasePluginConfig
> {
  constructor(
    schema: GraphQLSchema,
    fragments: LoadedFragment[],
    rawConfig: RawClientSideBasePluginConfig,
    documents: Types.DocumentFile[],
  ) {
    super(
      schema,
      fragments,
      {
        documentMode: DocumentMode.documentNodeImportFragments,
        documentNodeImport:
          '@graphql-typed-document-node/core#TypedDocumentNode',
        ...rawConfig,
      },
      {},
      documents,
    )

    autoBind(this)

    // We need to make sure it's there because in this mode, the base plugin doesn't add the import
    if (this.config.documentMode === DocumentMode.graphQLTag) {
      const documentNodeImport = this._parseImport(
        this.config.documentNodeImport || 'graphql#DocumentNode',
      )
      const tagImport = this._generateImport(
        documentNodeImport,
        'DocumentNode',
        true,
      )
      if (tagImport) this._imports.add(tagImport)
    }
  }

  protected override getDocumentNodeSignature(
    resultType: string,
    variablesTypes: string,
    node: FragmentDefinitionNode | OperationDefinitionNode,
  ) {
    if (
      this.config.documentMode === DocumentMode.documentNode ||
      this.config.documentMode === DocumentMode.documentNodeImportFragments ||
      this.config.documentMode === DocumentMode.graphQLTag
    ) {
      return `: DocumentNode<${resultType}, ${variablesTypes}>`
    }

    return super.getDocumentNodeSignature(resultType, variablesTypes, node)
  }
}
