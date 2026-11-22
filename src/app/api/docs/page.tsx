'use client';

import dynamic from 'next/dynamic';
import { type ComponentType, Suspense, useMemo } from 'react';
import 'swagger-ui-react/swagger-ui.css';

import type { SwaggerUIProps } from 'swagger-ui-react';

const SwaggerUI = dynamic<SwaggerUIProps>(() => import('swagger-ui-react'), {
  ssr: false,
});

const TAG_ORDER = [
  'Job（認証）',
  'Job Category（認証）',
  'Public Job（公開）',
  'Public Job Category（公開）',
  'Auth',
] as const;
const METHOD_ORDER = ['get', 'post', 'put', 'delete'] as const;

function wrapWithLabel(label: string) {
  return (Original: ComponentType<any>) => {
    const LabeledComponent = (props: Record<string, unknown>) => (
      <Original {...props}>{label}</Original>
    );

    LabeledComponent.displayName = `SwaggerUILabel(${label})`;

    return LabeledComponent;
  };
}

const createJapaneseLabelsPlugin = () => ({
  wrapComponents: {
    authorizeBtn: wrapWithLabel('認証'),
    tryItOutButton: wrapWithLabel('試してみる'),
    execute: wrapWithLabel('実行'),
    clear: wrapWithLabel('リセット'),
  },
});

const tagsSorter = (a: string, b: string) => {
  const indexA = TAG_ORDER.indexOf(a as (typeof TAG_ORDER)[number]);
  const indexB = TAG_ORDER.indexOf(b as (typeof TAG_ORDER)[number]);
  const orderA = indexA === -1 ? TAG_ORDER.length : indexA;
  const orderB = indexB === -1 ? TAG_ORDER.length : indexB;

  return orderA - orderB;
};

const operationsSorter = (a: any, b: any) => {
  const methodA = a.get('method');
  const methodB = b.get('method');
  const indexA = METHOD_ORDER.indexOf(methodA as (typeof METHOD_ORDER)[number]);
  const indexB = METHOD_ORDER.indexOf(methodB as (typeof METHOD_ORDER)[number]);
  const orderA = indexA === -1 ? METHOD_ORDER.length : indexA;
  const orderB = indexB === -1 ? METHOD_ORDER.length : indexB;

  return orderA - orderB;
};

type SwaggerUIExtendedProps = SwaggerUIProps & {
  defaultModelExpandDepth?: number;
};

export default function DocsPage() {
  const plugins = useMemo(() => [createJapaneseLabelsPlugin], []);
  const swaggerUiProps = useMemo<SwaggerUIExtendedProps>(
    () => ({
      url: '/api/openapi',
      docExpansion: 'list',
      defaultModelExpandDepth: 0,
      defaultModelsExpandDepth: -1,
      persistAuthorization: true,
      tryItOutEnabled: true,
      tagsSorter,
      operationsSorter,
      supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
      plugins,
    }),
    [plugins],
  );

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">
        API ドキュメント
      </h1>
      <Suspense fallback={<p>API ドキュメントを読み込み中です...</p>}>
        <SwaggerUI {...swaggerUiProps} />
      </Suspense>
    </main>
  );
}
