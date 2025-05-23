# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2024-04-08

### Added

- Added internationalization (i18n) support with English and Korean localization
  - Added translation files for admin, common, issues, pulls, and repos modules
  - Added language configuration via command-line arguments (--language) and environment variables (LANGUAGE)
  - Default language is English if not specified
- Added `list-issue-comments` tool to retrieve comments for issues and pull requests

### Changed

- Updated build scripts to include translation files in the distribution
- Enhanced error handling and server messages to use localized responses

### Contributors

- Contributed Korean localization support (PR https://github.com/ddukbg/github-enterprise-mcp/pull/3)
- Contributed list-issue-comments tool (PR https://github.com/ddukbg/github-enterprise-mcp/pull/4)

## [1.2.1] - 2024-04-07

### Added

- Improved development workflow with concurrent TypeScript compilation and server restart
  - Added concurrent build process for more efficient development
  - Updated npm scripts for better developer experience
- Enhanced HTTP transport mode configuration for URL-based connections
- Added documentation for local development workflow

### Changed

- Updated development scripts in package.json to support concurrent TypeScript compilation and nodemon
- Modified README.md with instructions for local development

### Contributors

- @perat - Improved local development workflow and configuration (PR https://github.com/ddukbg/github-enterprise-mcp/pull/2)

## [1.2.0] - 2025-04-01

### Added

- Docker support for easier deployment
  - Added Dockerfile using Node.js 18 Alpine
  - Created .dockerignore to exclude unnecessary files
  - Added docker-compose.yml for simplified deployment
  - Configured to run in HTTP/SSE transport mode by default
- User management API for GitHub Enterprise
  - Added listUsers: Retrieve all users in GitHub Enterprise
  - Added getUser: Get details of a specific user
  - Added createUser: Create a new user (Enterprise only)
  - Added updateUser: Update user information
  - Added deleteUser: Delete a user
  - Added suspendUser/unsuspendUser: Suspend and unsuspend users
  - Added listUserOrgs: List organizations a user belongs to

### Changed

- Updated README with Docker installation and usage instructions
- Improved documentation for enterprise-specific tools to clarify site_admin requirements

## [1.1.0] - 2025-03-25

- Initial public release
