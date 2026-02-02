import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import type { Project } from '@/types';
import LogoutButton from '@/components/LogoutButton';

  const getStatusPill = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'inactive':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'archived':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // This logic should mirror your /api/dashboard route, fetching data directly.
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="bg-titan-900 p-8 rounded-lg text-center border border-red-500/50">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
          <p className="text-slate-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalProjects: projects?.length || 0,
    activeProjects: projects?.filter((p) => p.status === 'active').length || 0,
  };

  return (
    <div className="min-h-screen bg-titan-950 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              Client Dashboard
            </h1>
            <p className="text-slate-400">Welcome, {user.email}</p>
          </div>
          <LogoutButton />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-titan-900 p-6 rounded-2xl border border-titan-800">
            <h3 className="text-sm font-medium text-slate-400">Total Projects</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalProjects}</p>
          </div>
          <div className="bg-titan-900 p-6 rounded-2xl border border-titan-800">
            <h3 className="text-sm font-medium text-slate-400">Active Projects</h3>
            <p className="text-4xl font-bold mt-2 text-emerald-400">
              {stats.activeProjects}
            </p>
          </div>
        </div>

        <div className="bg-titan-900 rounded-2xl border border-titan-800 overflow-hidden">
          <div className="p-6"><h2 className="text-xl font-bold">Your Projects</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-titan-800">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody>
                {projects && projects.length > 0 ? (
                  projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-titan-800 last:border-b-0 hover:bg-titan-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {project.name}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusPill(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(project.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-12 text-slate-500">
                      You don't have any projects yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};