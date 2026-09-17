// Google Authentication helper using Google Identity Services (GIS)
// Supports official Google OAuth popup (token client) and fallback.

export function loadGoogleScript() {
  return new Promise((resolve) => {
    if (window.google?.accounts) {
      resolve(true);
      return;
    }
    const existing = document.getElementById('google-jssdk');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-jssdk';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export async function signInWithGoogle() {
  await loadGoogleScript();

  // Check for configured Google Client ID from environment
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return new Promise((resolve, reject) => {
    // If GIS is loaded and we have a clientId
    if (window.google?.accounts?.oauth2 && clientId) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              reject(new Error(tokenResponse.error_description || tokenResponse.error));
              return;
            }
            try {
              // Fetch genuine profile details from Google UserInfo endpoint
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              });
              if (!res.ok) throw new Error('Failed to fetch user profile from Google');
              const info = await res.json();
              resolve({
                id: info.sub,
                name: info.name,
                email: info.email,
                picture: info.picture,
                provider: 'google',
              });
            } catch (err) {
              reject(err);
            }
          },
          error_callback: (err) => {
            reject(new Error(err.message || 'Google sign-in was cancelled or failed'));
          },
        });
        client.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (err) {
        console.warn('Google TokenClient init failed:', err);
      }
    }

    // If client_id is not yet set in .env, prompt user or open Google sign-in window
    // Prompt for Google Client ID or let user sign in with their Google account
    const enteredClientId = window.prompt(
      'Google Sign-In: Enter your Google OAuth Client ID (from Google Cloud Console), or press OK to use test Google sign-in:'
    );

    if (enteredClientId && enteredClientId.trim()) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: enteredClientId.trim(),
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              reject(new Error(tokenResponse.error));
              return;
            }
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            const info = await res.json();
            resolve({
              id: info.sub,
              name: info.name,
              email: info.email,
              picture: info.picture,
              provider: 'google',
            });
          },
        });
        client.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (err) {
        reject(err);
        return;
      }
    }

    // If user cancelled prompt or wants direct Google account authentication
    reject(new Error('Google Client ID not configured. Add VITE_GOOGLE_CLIENT_ID to .env'));
  });
}
