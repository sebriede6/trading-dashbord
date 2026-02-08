import { test, expect } from '@playwright/test';

test.describe('Authenticated User Journey', () => {
  test('registers, logs in, adds todos, visits profile, and logs out', async ({ page }) => {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type,authorization',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    };
    const jsonHeaders = {
      ...corsHeaders,
      'Content-Type': 'application/json',
    };

    const userState = {
      username: '',
      email: '',
      id: 1,
    };
    const todos = [];
    let nextTodoId = 1;

    const fulfillCors = async (route) => {
      await route.fulfill({ status: 204, headers: corsHeaders });
    };

    await page.route('**/api/auth/register', async (route) => {
      const method = route.request().method();
      if (method === 'OPTIONS') {
        return fulfillCors(route);
      }
      const payload = JSON.parse(route.request().postData() || '{}');
      userState.username = payload.username || 'demo-user';
      userState.email = payload.email || `${userState.username}@example.com`;
      return route.fulfill({
        status: 201,
        headers: jsonHeaders,
        body: JSON.stringify({ message: 'Registrierung erfolgreich. Bitte einloggen.' }),
      });
    });

    await page.route('**/api/auth/login', async (route) => {
      const method = route.request().method();
      if (method === 'OPTIONS') {
        return fulfillCors(route);
      }
      return route.fulfill({
        status: 200,
        headers: jsonHeaders,
        body: JSON.stringify({
          token: 'test-token',
          user: {
            username: userState.username || 'demo-user',
            email: userState.email || 'demo@example.com',
            id: userState.id,
          },
        }),
      });
    });

    await page.route('**/api/todos', async (route) => {
      const method = route.request().method();
      if (method === 'OPTIONS') {
        return fulfillCors(route);
      }
      if (method === 'GET') {
        return route.fulfill({
          status: 200,
          headers: jsonHeaders,
          body: JSON.stringify(todos),
        });
      }
      if (method === 'POST') {
        const payload = JSON.parse(route.request().postData() || '{}');
        const todo = {
          id: nextTodoId++,
          user_id: userState.id,
          text: payload.text || 'Neuer Eintrag',
          priority: payload.priority ?? 2,
        };
        todos.unshift(todo);
        return route.fulfill({
          status: 201,
          headers: jsonHeaders,
          body: JSON.stringify(todo),
        });
      }
      return fulfillCors(route);
    });

    await page.route('**/api/profile', async (route) => {
      const method = route.request().method();
      if (method === 'OPTIONS') {
        return fulfillCors(route);
      }
      return route.fulfill({
        status: 200,
        headers: jsonHeaders,
        body: JSON.stringify({
          user: {
            username: userState.username || 'demo-user',
            email: userState.email || 'demo@example.com',
            avatar_url: '',
          },
          stats: {
            trades: 0,
            pnl: 125,
            todos: todos.length,
            goals: 1,
          },
          psychology: {
            motivation: 7,
            focus: 8,
            emotion: 6,
          },
        }),
      });
    });

    const username = `demo_${Math.random().toString(36).slice(2, 8)}`;
    const password = 'TestPass123!';

    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Tradingtagebuch Pro/i })).toBeVisible();

    await page.getByRole('link', { name: /Login/i }).click();
    await expect(page).toHaveURL(/\/login$/);

    await page.getByRole('button', { name: 'Registrieren' }).click();
    await page.getByPlaceholder('Benutzername').fill(username);
    await page.getByPlaceholder('Passwort').fill(password);
    await page.getByRole('button', { name: /^Registrieren$/ }).click();
    await expect(page.getByText('Registrierung erfolgreich. Bitte einloggen.')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.getByPlaceholder('Benutzername').fill(username);
    await page.getByPlaceholder('Passwort').fill(password);
    await page.getByRole('button', { name: /^Einloggen$/ }).click();

    await expect(page).toHaveURL(/\/(profile|todos)$/);
    if (!page.url().endsWith('/todos')) {
      await page.getByRole('link', { name: 'Todos' }).click();
      await expect(page).toHaveURL(/\/todos$/);
    }
    await expect(page.getByRole('heading', { name: 'Meine Todos' })).toBeVisible();

    const todoText = 'Chart analysieren';
    await page.getByPlaceholder('Neues Todo').fill(todoText);
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByText(todoText)).toBeVisible();

    await page.getByRole('link', { name: 'Profil' }).click();
    await expect(page).toHaveURL(/\/profile$/);
    await expect(page.getByText('Einstellungen')).toBeVisible();
    await expect(page.getByTestId('profile-todos-card')).toContainText('1');

    await page.getByRole('button', { name: 'Logout' }).last().click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  });
});
