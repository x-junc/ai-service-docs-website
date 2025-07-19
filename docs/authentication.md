# Authentication System

This project includes a complete authentication system with the following features:

## Features

- ✅ User Registration
- ✅ User Login
- ✅ Password Reset Flow
- ✅ Protected Routes
- ✅ React Query Integration
- ✅ React Hook Form with Zod Validation
- ✅ TypeScript Support
- ✅ Toast Notifications
- ✅ Responsive Design

## API Endpoints

The authentication system is configured to work with the following API endpoints:

### Registration

```
POST {{URL}}/auth/signup
{
  "name": "John Doe",
  "email": "abdechafifilali@gmail.com",
  "password": "MyStrongPassword123",
  "confirmPassword": "MyStrongPassword123"
}
```

### Login

```
POST {{URL}}/auth/login
{
  "email": "abdechafifilali@gmail.com",
  "password": "mySecurePass45!"
}
```

### Logout

```
POST {{URL}}/auth/logout
```

### Forgot Password

```
POST {{URL}}/auth/forgot-password
{
  "email": "abdechafifilali@gmail.com"
}
```

### Verify Reset Code

```
POST {{URL}}/auth/verify-reset-code
{
  "email": "abdechafifilali@gmail.com",
  "code": "528285"
}
```

### Reset Password

```
POST {{URL}}/auth/reset-password
{
  "email": "abdechafifilali@gmail.com",
  "newPassword": "mySecurePass45!",
  "confirmPassword": "mySecurePass45!"
}
```

## Routes

### Public Routes (redirect to dashboard if authenticated)

- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Forgot password page
- `/verify-reset-code` - Verify reset code page
- `/reset-password` - Reset password page

### Protected Routes (require authentication)

- `/dashboard` - User dashboard

### Public Routes (accessible to all)

- `/` - Home page
- `/docs` - Documentation

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

### API Response Format

The API should return responses in the following format:

#### Authentication Success Response

```json
{
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt-token",
  "message": "Success message"
}
```

#### General API Response

```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

## Usage

### Authentication Context

The authentication state is managed globally using React Context:

```tsx
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? <p>Welcome, {user?.name}!</p> : <p>Please log in</p>}
    </div>
  );
}
```

### Authentication Mutations

Use the provided hooks for authentication actions:

```tsx
import { useLogin, useRegister, useLogout } from "@/hooks/use-auth-mutations";

function LoginForm() {
  const loginMutation = useLogin();

  const handleSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

### Protected Routes

Wrap components that require authentication:

```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

## Form Validation

All forms use Zod schemas for validation:

```tsx
import { loginSchema } from "@/lib/auth-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
    </form>
  );
}
```

## Token Management

- JWT tokens are automatically stored in localStorage
- Tokens are included in API requests via axios interceptors
- Automatic logout on token expiration (implement server-side)

## Security Features

- Password strength validation
- Email format validation
- Password confirmation matching
- CSRF protection (implement server-side)
- Rate limiting (implement server-side)

## Styling

The authentication pages use:

- Tailwind CSS for styling
- Shadcn/ui components
- Custom gradient backgrounds
- Responsive design
- Dark mode support

## Development

To run the development server:

```bash
npm install
npm run dev
```

Visit `http://localhost:8080` to see the application.

## Testing the Authentication Flow

1. Visit `/register` to create a new account
2. Visit `/login` to sign in
3. Visit `/forgot-password` to test password reset
4. Try accessing `/dashboard` without authentication (should redirect to login)
5. Sign in and access `/dashboard` (should work)

## Next Steps

1. Implement the backend API endpoints
2. Add email verification
3. Add social login options
4. Add two-factor authentication
5. Add password strength meter
6. Add remember me functionality
7. Add session management
