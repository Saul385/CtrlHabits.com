import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';

/**
 * The server-side load function for the ___ page.
 */
export async function GET({ params }: RequestEvent<RouteParams>) {
  return new Response(JSON.stringify({ hello: params.id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}