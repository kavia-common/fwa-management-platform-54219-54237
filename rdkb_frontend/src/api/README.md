# API Client Notes

- Base URL is read from REACT_APP_API_BASE_URL
- Token (auth_token) is read from localStorage and used as Bearer
- Standard helpers in client.js: api.get, api.post, api.put, api.del
- Endpoint paths centralized in endpoints.js; adjust to match backend

If backend returns { "detail": "error" } on failure, client throws Error with message from detail when possible.
