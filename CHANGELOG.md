# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.1.3](https://github.com/Beltiston/Chronos/compare/v0.1.2...v0.1.3) (2025-12-15)


### ✨ Features

* **api:** add user registration route with input validation and email existence checks, and update error definitions. ([3d4cfe2](https://github.com/Beltiston/Chronos/commit/3d4cfe2351da444cdc456db8894952810c9d5773))
* **api:** Added a ratelimit to the command handler. ([c681011](https://github.com/Beltiston/Chronos/commit/c681011e79f3fe6fd84991cf0ecdeb6c94e2d835))
* **api:** Created customError to have more consistent error messaging. ([f07301c](https://github.com/Beltiston/Chronos/commit/f07301cb28df314d073c3f12710bebd6048b8ffc))
* **api:** implement OAuth instance management with new database schema, utilities, and API routes, and refactor user creation. ([07c2180](https://github.com/Beltiston/Chronos/commit/07c21802b37d747b7724068ce381a18adcd26ffc))
* **api:** Implement user registration with username validation, email regex, and a disable registration flag, while centralizing auth database connections and types. ([7f97110](https://github.com/Beltiston/Chronos/commit/7f971101394cd733c4964de400befecf23073597))
* Initialize `better-auth` by adding CLI scripts, updating the database path, and generating the initial migration schema. ([4c1f9a2](https://github.com/Beltiston/Chronos/commit/4c1f9a213a1997ce0636018db81d56e7155dcee3))


### ⚙️ Refactor

* migrate authentication to use JWTs, update auth endpoints, and add invalid credentials error. ([04574e9](https://github.com/Beltiston/Chronos/commit/04574e953f20a14e87cfe52a935c77ba5c1650f1))


### 🔧 Chores

* **deps:** bump actions/checkout from 2 to 6 ([3b560f9](https://github.com/Beltiston/Chronos/commit/3b560f947dd4477ae1700e271b2a7c60644c8460))
* **deps:** bump actions/setup-node from 2 to 6 ([66c55b4](https://github.com/Beltiston/Chronos/commit/66c55b4552498395f69618abb161f94cb283c780))

## [0.1.2](https://github.com/Beltiston/Chronos/compare/v0.1.1...v0.1.2) (2025-12-15)

### ✨ Features

* Add Nix environment, Vitest testing, PSI header configuration, and refactor TypeScript and database migration files. ([2b29b4e](https://github.com/Beltiston/Chronos/commit/2b29b4e133713878b61df7f017b0b9ef07a342a2))
* Added file header. ([1cfa665](https://github.com/Beltiston/Chronos/commit/1cfa6656085b4821641560d5a98c57f787896899))
* **ai:** Added ai agent rules. ([2ae670f](https://github.com/Beltiston/Chronos/commit/2ae670fdb71a57086cd835e88798d87ca504cc94))
* **api-auth:** Made auth use a type. ([a0cff89](https://github.com/Beltiston/Chronos/commit/a0cff8913d480ee52d57c7b8350e73f4e6728099))
* **api:** Added private tag to routehander to handle auth required routes ([3708d97](https://github.com/Beltiston/Chronos/commit/3708d97007e3cd46df8a5d50049ea1f237b9ddc4))
* **api:** Added session middleware. ([661183d](https://github.com/Beltiston/Chronos/commit/661183d1f3e351cbfea5a138d9b4bd18f2ea603e))
* **test:** Created a NIX test ti check package versions. ([c025edd](https://github.com/Beltiston/Chronos/commit/c025edd8ea59505da87fa09e7f9ae237b2e5d77b))
* **vscode:** added vscode settings ([303ef74](https://github.com/Beltiston/Chronos/commit/303ef74a88e935efc931538fa92ee45ccc41c861))

### 🐛 Fixes

* **database:** Now uses train-case for migrations ([b064413](https://github.com/Beltiston/Chronos/commit/b06441302a552d018700dd1763f5871498ad8a06))
* **nix:** Fixed Direnv to load the correct Node_modules binaries ([9297500](https://github.com/Beltiston/Chronos/commit/9297500334c742478a3525becfd7e1e78b309c0d))

### 🧪 Test

* **api:** added a temporary endpoint to check session ([e097327](https://github.com/Beltiston/Chronos/commit/e09732738ce8cf42ac677408bc8c14278d4a5640))

### 🔧 Chores

* Added flake lock. ([39185f5](https://github.com/Beltiston/Chronos/commit/39185f543a60fb46e5e7fcf0747f877b2bcc6805))
* Added npmrc ([ed425a7](https://github.com/Beltiston/Chronos/commit/ed425a7caead6e8d841bc9008425dcd809d2480b))
* **api:** Removed unused routes. ([dab9a0e](https://github.com/Beltiston/Chronos/commit/dab9a0e459b619766379cadc6dc388c88a9c5cc3))
* **nix:** Added git as package-manager. ([0189db4](https://github.com/Beltiston/Chronos/commit/0189db47750b323766b73e0414860767e6c03387))
* **nix:** Added pnpm as package-manager. ([070be26](https://github.com/Beltiston/Chronos/commit/070be26b82d249cd8ef9fe1d85f9c5eba1dc5af6))
* readme update ([20f0b76](https://github.com/Beltiston/Chronos/commit/20f0b764090bcae170819f32a6926a260dabb167))
* Removed unused codes ([112ad98](https://github.com/Beltiston/Chronos/commit/112ad98d77f5476cf8e3783634c6cb33fc9543e7))
* Split tsconfig into multiple files. ([cfcda28](https://github.com/Beltiston/Chronos/commit/cfcda28343592be12fdcbb2cb5e197d5331a9f84))
* Updated License and added more package scripts. ([5fe2485](https://github.com/Beltiston/Chronos/commit/5fe2485cf418c869a75e76326281903626a485ef))

## 0.1.1 (2025-12-12)

### ✨ Features

* Added placeholder endpoints. ([0cb18a9](https://github.com/Beltiston/Chronos/commit/0cb18a97b3394a3a50c45f6fbb9bd3ec48cec3c3))
* Added routeHandler. ([31bd67c](https://github.com/Beltiston/Chronos/commit/31bd67c3f04fc5c844c6f417eb9a182c3ac592e7))
* **api:** Created a logger util. ([63ed6eb](https://github.com/Beltiston/Chronos/commit/63ed6eb256060a1dfb38aee3586d525a6617ce96))
* **api:** Created Hono instance. ([c47af5d](https://github.com/Beltiston/Chronos/commit/c47af5dcaae9d45b165b154d43d8c48e5bd13921))
* **database:** Added database migration and create script. ([c6829cf](https://github.com/Beltiston/Chronos/commit/c6829cff7cb7d883d608fc520e502716570c9548))
* **environmental:** Created .env example. ([bb5e669](https://github.com/Beltiston/Chronos/commit/bb5e669fc2f1d640247d1261c3b5ff1517907495))
* **environmental:** Created env function with Zod typing. ([c10a8bb](https://github.com/Beltiston/Chronos/commit/c10a8bb53e771b13bf533634cf6fe7287490b0ff))
* Updated env file to have database entry ([1854352](https://github.com/Beltiston/Chronos/commit/1854352f67ad08104e5fe760ab04fae33d00f2bb))

### 📝 Documentation

* **license:** Add GNU Lesser General Public License (LGPL) v3 ([a7e0680](https://github.com/Beltiston/Chronos/commit/a7e0680786b74dcfb0c961ee4b1967d589280065))
* **vscode:** Added extension recommendations. ([dd18644](https://github.com/Beltiston/Chronos/commit/dd18644d51e20a6e69084756494334b091de9a30))
* **vscode:** Added vscode settings file. ([26d0573](https://github.com/Beltiston/Chronos/commit/26d057386635f1c2b97d876389005f99907836dc))

### 🔧 Chores

* Added package Scripts. ([a48974d](https://github.com/Beltiston/Chronos/commit/a48974d1030107f7fe020a67e3e331d250e09a52))
* Added run scripts. ([e1aa476](https://github.com/Beltiston/Chronos/commit/e1aa4760dc2e7f4627cf6d6b913f8f05fc1a356d))
* Created a TSConfig file. ([ec320f2](https://github.com/Beltiston/Chronos/commit/ec320f2f6f7941e29cb1c413d99bf910d26d3e1d))
* **env:** fixed PATH for node_modules binary. ([857a496](https://github.com/Beltiston/Chronos/commit/857a496fb6a2e18e79f2c0d39ae9df033826259a))
* **env:** Update PATH and set default CHRONOS_ENV ([791b06b](https://github.com/Beltiston/Chronos/commit/791b06ba794535d82716c0f7a9453573058e8690))
* **git:** Added github features ([05be7a9](https://github.com/Beltiston/Chronos/commit/05be7a94963d1bed04cb4b9fb6451c67f92f1cda))
