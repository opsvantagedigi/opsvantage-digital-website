import { createServerClient, type CookieOptions } from '@supabase/ssr';

// This is a placeholder for a server-side cookie store.
// In a non-Next.js environment, you would need to provide your own
// implementation for handling cookies on the server.
const getCookieStore = () => {
  const store = new Map<string, string>();
  return {
    get(name: string) {
      return store.get(name);
    },
    set(name: string, value: string, options: CookieOptions) {
      store.set(name, value);
    },
    remove(name: string, options: CookieOptions) {
      store.delete(name);
    },
  };
};

export function createClient() {
  const cookieStore = getCookieStore();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name);
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.remove(name, options);
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
