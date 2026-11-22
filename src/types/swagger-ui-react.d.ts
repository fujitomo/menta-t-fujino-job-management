declare module 'swagger-ui-react' {
  import type { ComponentType } from 'react';

  export interface SwaggerUIProps {
    url?: string;
    spec?: Record<string, unknown>;
    layout?: string;
    docExpansion?: string;
    defaultModelsExpandDepth?: number;
    defaultModelRendering?: string;
  }

  const SwaggerUI: ComponentType<SwaggerUIProps>;

  export default SwaggerUI;
}
