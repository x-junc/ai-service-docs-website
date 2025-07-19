# CORS Solutions for Development

There are several ways to resolve the CORS issue you're experiencing:

## Option 1: Use Vite Proxy (Recommended for Development)

I've already configured this in your `vite.config.ts`. The proxy will forward requests from `/api/*` to `http://localhost:3000/*`.

### How it works:

- Frontend makes requests to `/api/auth/signup`
- Vite proxy forwards to `http://localhost:3000/auth/signup`
- No CORS issues because the request appears to come from the same origin

### To use:

1. Restart your development server: `npm run dev`
2. Your API calls will now go through the proxy automatically

## Option 2: Configure CORS on Your Backend

If you're using Express.js, add CORS middleware:

```javascript
const cors = require("cors");
const express = require("express");
const app = express();

// Allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// Or allow all origins (only for development)
app.use(cors());
```

If you're using a different backend framework, look for similar CORS configuration options.

## Option 3: Use Environment-Specific URLs

Update your `.env` files:

### `.env.development`:

```
VITE_API_URL=/api
```

### `.env.production`:

```
VITE_API_URL=https://your-production-api.com
```

## Option 4: Browser Extension (Quick Test Only)

For quick testing only, you can disable CORS in Chrome:

- Install "CORS Unblock" extension
- Enable it temporarily for testing

⚠️ **Don't use this for production or leave it enabled**

## Current Configuration

Your current setup uses Option 1 (Vite Proxy):

- Development: `/api` → proxied to `http://localhost:3000`
- Production: Direct API calls to configured URL

## Next Steps

1. **Restart your dev server** to apply the proxy configuration
2. **Make sure your backend is running** on `http://localhost:3000`
3. **Test the registration** again

The proxy should resolve the CORS issue for development!
