export interface Project {
  id: string;
  created_at: string;
  name: string;
  status: 'active' | 'inactive' | 'archived';
  user_id: string;
  // Add other project-related fields here
}