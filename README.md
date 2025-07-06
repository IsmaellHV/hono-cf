# Hono Mail Service API

A robust and scalable email service API built with [Hono](https://hono.dev/) and designed to run on Cloudflare Workers. This service provides a clean architecture for handling email operations with support for attachments, Excel file generation, and comprehensive validation.

## 🚀 Features

- **Modern Architecture**: Built with Hono framework for high performance
- **Email Service**: Send emails with HTML/text content
- **File Attachments**: Support for file attachments with base64 encoding
- **Excel Generation**: Dynamic Excel file creation and attachment
- **Input Validation**: Comprehensive validation using AJV (Another JSON Schema Validator)
- **Multilingual Support**: Built-in internationalization with English and Spanish
- **Cloudflare Workers**: Optimized for edge computing
- **TypeScript**: Full type safety throughout the application

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare Workers account (for deployment)

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IsmaellHV/hono-cf.git
   cd hono-cf-01
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PREFIX=v1
   # Add your other environment variables here
   ```

## 🚀 Usage

### Development

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:8787`

### Production Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## 📚 API Documentation

### Send Email

**POST** `/api/{prefix}/mail/send`

#### Request Body:

```json
{
  "type": "html",
  "name": "Sender Name",
  "to": ["recipient@example.com"],
  "cc": ["cc@example.com"],
  "bcc": ["bcc@example.com"],
  "priority": "high",
  "subject": "Email Subject",
  "cuerpo": "Email body content",
  "saludo": "Greeting message",
  "excel": [
    {
      "data": {
        "sheet1": [
          ["Header1", "Header2"],
          ["Data1", "Data2"]
        ]
      },
      "filename": "report.xlsx"
    }
  ],
  "attachment": [
    {
      "base64": "base64_encoded_content",
      "filename": "document.pdf",
      "cid": "unique_id"
    }
  ]
}
```

#### Response:

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## 🏗️ Architecture

The project follows a clean architecture pattern:

```
src/
├── context/
│   └── Master/
│       └── Mail/
│           ├── Application/          # Use cases
│           ├── Domain/              # Business logic
│           └── Infrastructure/      # External dependencies
├── rest/                           # REST API layer
├── shared/                         # Shared utilities
├── types/                          # TypeScript definitions
└── language/                       # Internationalization
```

### Key Components:

- **Domain Layer**: Contains business entities and repository interfaces
- **Application Layer**: Implements use cases and business logic
- **Infrastructure Layer**: Handles external dependencies and data access
- **REST Layer**: Manages HTTP requests and responses

## 🔧 Configuration

### Wrangler Configuration

The project uses `wrangler.jsonc` for Cloudflare Workers configuration:

```json
{
  "name": "hono-cf-01",
  "main": "src/index.ts",
  "compatibility_date": "2025-03-06"
}
```

### TypeScript Configuration

The project includes a comprehensive TypeScript configuration in `tsconfig.json` with strict type checking enabled.

## 🧪 Testing

Run tests (when available):

```bash
npm test
```

## 📦 Dependencies

### Main Dependencies:

- **hono**: Web framework for Cloudflare Workers
- **ajv**: JSON Schema validator
- **ajv-formats**: Additional formats for AJV
- **axios**: HTTP client
- **resend**: Email service provider
- **ua-parser-js**: User agent parser

### Development Dependencies:

- **@types/node**: Node.js type definitions
- **wrangler**: Cloudflare Workers CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

If you discover any security-related issues, please check [SECURITY.md](SECURITY.md) for information on how to report them responsibly.

## 👨‍💻 Author

**Ismael Hurtado**

- Email: [ismaelhv@outlook.com](mailto:ismaelhv@outlook.com)
- LinkedIn: [https://www.linkedin.com/in/ihurtadov/](https://www.linkedin.com/in/ihurtadov/)
- GitHub: [https://github.com/IsmaellHV](https://github.com/IsmaellHV)
- Portfolio: [https://ismaelhv.com](https://ismaelhv.com)

## 🙏 Acknowledgments

- [Hono](https://hono.dev/) - The web framework that powers this API
- [Cloudflare Workers](https://workers.cloudflare.com/) - The runtime environment
- [AJV](https://ajv.js.org/) - JSON Schema validator

## 📈 Roadmap

- [ ] Add comprehensive unit tests
- [ ] Implement email templates
- [ ] Add rate limiting
- [ ] Implement authentication middleware
- [ ] Add monitoring and logging
- [ ] Create OpenAPI documentation

---

⭐ If you found this project helpful, please give it a star on GitHub!
