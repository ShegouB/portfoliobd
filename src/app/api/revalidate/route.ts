import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Route API pour forcer la revalidation depuis Notion (webhook ou appel manuel).
 * Usage : POST /api/revalidate avec le header Authorization: Bearer <REVALIDATE_SECRET>
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  revalidatePath('/');
  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
}

// GET pour vérifier que la route est active
export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Revalidation endpoint actif' });
}
