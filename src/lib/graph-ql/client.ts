/* eslint-disable @typescript-eslint/no-explicit-any */
class GraphQLError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GraphQLError';
  }
}

export async function fetchGraphQL<T = any>(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>,
  revalidateSeconds: number = 60 // 0にするとDynamic Renderingになる (Dynamic Renderingにする場合はSuspenseを検討する)
): Promise<T> {
  // 環境変数の存在チェック
  if (!process.env.HASURA_BACKEND_URL) {
    throw new GraphQLError('HASURA_BACKEND_URL is not configured');
  }

  // if (!process.env.HASURA_ADMIN_SECRET) {
  //   throw new GraphQLError('HASURA_ADMIN_SECRET is not configured');
  // }

  // User should not catch error by themselves
  // https://nextjs.org/docs/messages/ppr-caught-error
  const result = await fetch(process.env.HASURA_BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    next: {
      revalidate: revalidateSeconds, // Static Renderingのキャッシュ時間を設定
    },
  });

  if (!result.ok) {
    throw new GraphQLError(`HTTP error! status: ${result.status}`);
  }

  const json = await result.json();

  // GraphQLのエラーチェック
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new GraphQLError(
      `GraphQL Error: ${json.errors.map((e: any) => e.message).join(', ')}`
    );
  }

  return json as T;
}
