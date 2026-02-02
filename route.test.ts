import { GET } from './route';
import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import type { Project } from '@/types/index';

// Mock the Supabase server client
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

const createClientMock = createClient as jest.Mock;

describe('Dashboard API Route', () => {
  it('should return dashboard data for an authenticated user', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const mockProjects: Project[] = [
      { id: 'proj-1', name: 'Project Alpha', status: 'active', created_at: new Date().toISOString(), user_id: 'user-123' },
      { id: 'proj-2', name: 'Project Beta', status: 'inactive', created_at: new Date().toISOString(), user_id: 'user-123' },
    ];

    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser }, error: null }),
      },
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockProjects, error: null }),
    };
    createClientMock.mockReturnValue(mockSupabase);

    const request = new NextRequest('http://localhost/api/dashboard');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.user.id).toBe(mockUser.id);
    expect(body.projects).toHaveLength(2);
    expect(body.stats.totalProjects).toBe(2);
    expect(body.stats.activeProjects).toBe(1);
    expect(mockSupabase.from).toHaveBeenCalledWith('projects');
    expect(mockSupabase.eq).toHaveBeenCalledWith('user_id', mockUser.id);
  });

  it('should return 401 Unauthorized if no user is authenticated', async () => {
    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
      },
    };
    createClientMock.mockReturnValue(mockSupabase);

    const request = new NextRequest('http://localhost/api/dashboard');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe('Unauthorized');
  });

  it('should return 500 if there is a database error', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const dbError = new Error('Database connection failed');

    const mockSupabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser }, error: null }),
      },
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: null, error: dbError }),
    };
    createClientMock.mockReturnValue(mockSupabase);

    const request = new NextRequest('http://localhost/api/dashboard');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe('Failed to fetch dashboard data.');
  });
});