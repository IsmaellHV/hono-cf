# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial public release preparation
- Comprehensive documentation
- Security policy
- Contributing guidelines
- MIT License

## [1.0.0] - 2025-01-06

### Added

- Initial release of Hono Mail Service API
- Email sending functionality with support for:
  - HTML and text content
  - File attachments with base64 encoding
  - Excel file generation and attachment
  - Multiple recipients (to, cc, bcc)
  - Email priority settings
- Input validation using AJV (Another JSON Schema Validator)
- Clean architecture implementation with Domain-Driven Design
- Multilingual support (English and Spanish)
- Cloudflare Workers optimization
- TypeScript implementation with full type safety
- REST API with proper error handling
- Authorization and authentication adapters
- Generic adapters for common functionality
- reCAPTCHA integration support

### Technical Features

- Hono framework for high-performance routing
- Cloudflare Workers runtime compatibility
- Modular architecture with separation of concerns
- Entity-based domain modeling
- Repository pattern implementation
- Use case driven application layer
- Infrastructure adapters for external services

### Dependencies

- Hono 4.7.4 for web framework
- AJV 8.17.1 for JSON schema validation
- Axios 1.8.2 for HTTP requests
- Resend 4.1.2 for email service
- UA-Parser-JS 2.0.2 for user agent parsing
- TypeScript support with proper type definitions

### Development Setup

- Wrangler CLI integration for Cloudflare Workers
- TypeScript configuration with strict type checking
- Development server with hot reload
- Production deployment scripts

[Unreleased]: https://github.com/IsmaellHV/hono-cf/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/IsmaellHV/hono-cf/releases/tag/v1.0.0
