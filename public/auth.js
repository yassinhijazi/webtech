// auth.js
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://filme-yassinhijazi.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzgxMDMwMTksImlkIjoiZWFhYThjZjEtZGY5OS00OGE1LWIyYjYtZmE0ZjZmMzFiNDAzIn0.B5op4YHrHRHNGbDPPKPJZ7O_Kk94BPxxmSjA6ngPYlrxRijMrBdy9fjvtG_Gq1rMmdK9yRi50gcBAJI_6OoeBQ'
});
async function testDatabaseConnection() {
  try {
    const result = await client.execute({
      sql: 'SELECT 1', // Eine einfache SQL-Abfrage, die nur eine Zahl zurückgibt
    });
    console.log('Datenbankverbindung erfolgreich:', result);
  } catch (error) {
    console.error('Fehler bei der Verbindung zur Datenbank:', error);
  }
}

testDatabaseConnection();

// Login Handler
export async function loginUser(username, password) {
  try {
    const result = await client.execute({
      sql: 'SELECT nutzer_id, username, created_at FROM users WHERE username = ? AND password = ?',
      args: [username, password]
    });
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Generiere einen einfachen Session-Token
      const sessionToken = btoa(user.nutzer_id + ':' + Date.now());
      localStorage.setItem('userToken', sessionToken);
      localStorage.setItem('userData', JSON.stringify({
        id: user.nutzer_id,
        username: user.username,
        memberSince: new Date(user.created_at).toLocaleDateString()
      }));
      return { success: true, user };
    } else {
      return { success: false, error: 'Ungültige Anmeldedaten' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

// Register Handler
export async function registerUser(username, password) {
  try {
    // Prüfe ob Benutzer bereits existiert
    const existingUser = await client.execute({
      sql: 'SELECT username FROM users WHERE username = ?',
      args: [username]
    });

    if (existingUser.rows.length > 0) {
      return { success: false, error: 'Benutzername bereits vergeben' };
    }

    // Füge neuen Benutzer hinzu
    const result = await client.execute({
      sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
      args: [username, password]
    });

    return { success: true, userId: result.lastInsertRowid };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
}

// Logout Handler
export function logoutUser() {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
  window.location.href = 'index.html';
}

// Check Auth Status
export function checkAuthStatus() {
  const token = localStorage.getItem('userToken');
  const userData = localStorage.getItem('userData');
  
  if (token && userData) {
    return JSON.parse(userData);
  }
  return null;
}
