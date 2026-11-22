import { NextResponse } from 'next/server';

import { paths as authLoginPaths } from '@/server/openapi/auth/login';
import { paths as authMePaths } from '@/server/openapi/auth/me';
import { paths as authRegisterPaths } from '@/server/openapi/auth/register';
import { baseDocument } from '@/server/openapi/base';
import { paths as jobDeletePaths } from '@/server/openapi/job/delete';
import { paths as jobGetPaths } from '@/server/openapi/job/get';
import { paths as jobGetByIdPaths } from '@/server/openapi/job/get-by-id';
import { paths as jobPostPaths } from '@/server/openapi/job/post';
import { paths as jobPutPaths } from '@/server/openapi/job/put';
import { paths as jobCategoryDeletePaths } from '@/server/openapi/job-category/delete';
import { paths as jobCategoryGetPaths } from '@/server/openapi/job-category/get';
import { paths as jobCategoryGetByIdPaths } from '@/server/openapi/job-category/get-by-id';
import { paths as jobCategoryPostPaths } from '@/server/openapi/job-category/post';
import { paths as jobCategoryPutPaths } from '@/server/openapi/job-category/put';
import { paths as publicJobDeletePaths } from '@/server/openapi/public/job/delete';
import { paths as publicJobGetPaths } from '@/server/openapi/public/job/get';
import { paths as publicJobGetByIdPaths } from '@/server/openapi/public/job/get-by-id';
import { paths as publicJobPostPaths } from '@/server/openapi/public/job/post';
import { paths as publicJobPutPaths } from '@/server/openapi/public/job/put';
import { paths as publicJobCategoryDeletePaths } from '@/server/openapi/public/job-category/delete';
import { paths as publicJobCategoryGetPaths } from '@/server/openapi/public/job-category/get';
import { paths as publicJobCategoryGetByIdPaths } from '@/server/openapi/public/job-category/get-by-id';
import { paths as publicJobCategoryPostPaths } from '@/server/openapi/public/job-category/post';
import { paths as publicJobCategoryPutPaths } from '@/server/openapi/public/job-category/put';
import { paths as publicPrefectureGetPaths } from '@/server/openapi/public/prefecture/get';
import { deepMerge } from '@/server/openapi/utils/merge';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const openApiDocument = deepMerge<Record<string, unknown>>(
  baseDocument,
  {
    servers: [
      {
        url: siteUrl,
      },
    ],
  },
  { paths: authRegisterPaths },
  { paths: authLoginPaths },
  { paths: authMePaths },
  { paths: jobGetPaths },
  { paths: jobGetByIdPaths },
  { paths: jobPostPaths },
  { paths: jobPutPaths },
  { paths: jobDeletePaths },
  { paths: jobCategoryGetPaths },
  { paths: jobCategoryGetByIdPaths },
  { paths: jobCategoryPostPaths },
  { paths: jobCategoryPutPaths },
  { paths: jobCategoryDeletePaths },
  { paths: publicJobGetPaths },
  { paths: publicJobGetByIdPaths },
  { paths: publicJobPostPaths },
  { paths: publicJobPutPaths },
  { paths: publicJobDeletePaths },
  { paths: publicJobCategoryGetPaths },
  { paths: publicJobCategoryGetByIdPaths },
  { paths: publicJobCategoryPostPaths },
  { paths: publicJobCategoryPutPaths },
  { paths: publicJobCategoryDeletePaths },
  { paths: publicPrefectureGetPaths },
);

export async function GET() {
  return NextResponse.json(openApiDocument, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
