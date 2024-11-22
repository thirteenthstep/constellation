Proof of Concept: share close to 100% of application code between
- react native vanilla cli project using metro
- react web project using vite

## Prerequisites
- Node > 18 and Corepack: `corepack enable` since the project uses yarn berry for monorepo workspaces
- Install dependencies and apply patches at root folder: `yarn (install)`
- Install iOS Pods  `cd apps/native/ios && pod install`

## Quickstart
If you want login data being prefilled at dev mode, add EMAIL/PASSWORD credentials at
`/apps/native/.env` for react native or `/apps/web/.env` for web.
Or create `.env.local` files - which are gitignored - and start react native accordingly: `APP_ENV=local react-native start`

- RN Dev: start metro using `yarn start:metro`
- iOS: `yarn start:ios` or build using xcode from `/apps/native/ios`
- android: `yarn start:android` or build using android studio from `/apps/native/android`
- web: `yarn start:web` or start from a script at `/apps/web/package.json`

>Note: though it does work (technically) in the browser, the ui is not optimized for web in any way. I would recommend to try iOS.

## Structure
- `/apps/native`: react-native cli project
- `/apps/web`: react vite project (using react native web)
- `/packages/app`: shared application code

## Features
see `/packages/app/features`
- Login/Logout
- Token refresh
- Fetch stuff from GraphQl endpoint
- "Pin" items using local state
- Persist login and "pins"

### Caveats
- UI is not optimized for web, or at all
- Mixing client/server state might be error prone

#### Blunders
- access tokens should not be stored using localStorage
