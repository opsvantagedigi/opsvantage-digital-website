'use client';

import { createClient } from '../../lib/supabase/client';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
};