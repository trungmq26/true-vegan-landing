import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
}

// Đăng nhập với email và password
export const signIn = async (email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error signing in:', error);
      return { success: false, error: error.message };
    }

    if (data.user) {
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || ''
        }
      };
    }

    return { success: false, error: 'Đăng nhập thất bại' };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error: 'Có lỗi xảy ra khi đăng nhập' };
  }
};

// Đăng xuất
export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: 'Có lỗi xảy ra khi đăng xuất' };
  }
};

// Lấy user hiện tại
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      return {
        id: user.id,
        email: user.email || ''
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Kiểm tra đã đăng nhập chưa
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user !== null;
};

// Lắng nghe thay đổi auth state
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email || ''
      });
    } else {
      callback(null);
    }
  });
};
