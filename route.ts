import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type { Project } from '@/types/index';

export async function GET(request: Request) {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch dashboard data for the authenticated user.
    // This assumes you have a 'projects' table with a 'user_id' column
    // that is a foreign key to the 'auth.users' table.
    const { data: projects, error: dbError } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (dbError) {
      throw dbError;
    }

    // This is a placeholder for more complex dashboard data aggregation.
    const dashboardData = {
      user: {
        id: user.id,
        email: user.email,
      },
      projects: projects as Project[],
      stats: {
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === 'active').length,
      },
    };

    return NextResponse.json(dashboardData);

  } catch (err) {
    const error = err as Error;
    console.error('DASHBOARD_API_ERROR:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data.' },
      { status: 500 }
    );
  }
}