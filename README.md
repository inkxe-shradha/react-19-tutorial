# React 19 Tutorial

Welcome to the React 19 Tutorial! This guide will help you get started with the latest features and best practices in React 19 :

## Table of Contents

- JSX is a syntatic sugar for `React.createElement()`
- New Hooks in React 19
- Concurrent Rendering Improvements
- Enhanced Server-Side Rendering (SSR)
- Improved Developer Tools 
- Performance Optimizations
- Migration Guide from React 18 to React 19.
- Conditional Rendering in React 19 : Activity Component Example
- props drilling : Using Context API to avoid props drilling
- Custom Hooks : Building a useFetch Hook
- State Management with useReducer : Shopping Cart Example
- Context API Enhancements: It will broadcast updates more efficiently high level overview

## JWT Authentication Lab

Open `/jwt-auth` from the sidebar or overview. Use `student@example.com` and
`React19Demo!` to log in, then access `/jwt-auth/dashboard`. Choose a 15-second,
1-minute, or 5-minute token lifetime to test automatic logout. A valid session
survives a refresh in the same tab using session storage. Expiry monitoring stays
active across tutorial navigation and rechecks when a background tab resumes.

The inspector checks JWT structure and time claims (`exp`, `nbf`, `iat`), but
**does not verify signatures** or authenticate pasted tokens. Login is a local
mock with unsigned `alg: none` tokens and public test credentials, not a secure
authentication implementation. Never use unsigned tokens or frontend signing
secrets in production. Real authentication needs a server that verifies tokens
and authorizes each protected request; clearing browser state does not revoke
an issued token on the server.

Validation tests: `npm test` runs the JWT claim and expiry edge-case tests.