# Licsense - License Management System

A comprehensive software license management system built with modern technologies including Spring Boot, Angular, Rust, and Keycloak for OAuth2 authentication.

**!!! IMPORTANT !!!**: This project is just a personal experiment to explore new technologies and is not intended for production use.

## Overview

Licsense is a multi-module project designed to manage software licenses, providing both server-side API implementations (Java/Spring Boot and Rust) and a modern Angular-based GUI. The system includes OAuth2 authentication via Keycloak, OpenAPI-driven API specifications, and client libraries for integration.

## Project Structure

This is a Maven-based multi-module project with the following components:

### Core Modules

- **[license-server](license-server/)** - Spring Boot-based license server with REST API
  - PostgreSQL database integration
  - JWT/OAuth2 authentication with Keycloak
  - License generation, validation, and management
  - Actuator for monitoring

- **[license-server-rs](license-server-rs/)** - Rust implementation of the license server using Axum
  - High-performance alternative to the Java implementation
  - OpenAPI-generated from specifications

- **[license-gui](license-gui/)** - Angular 20 frontend application
  - Material Design UI
  - OAuth2/OIDC integration
  - Multi-language support (i18n)
  - TypeScript client library integration

### Supporting Modules

- **[license-oas-api](license-oas-api/)** - OpenAPI specifications and code generation
  - REST API definition (openapi.yaml)
  - Client generation (TypeScript, WebClient)
  - Server stubs (Spring Boot, Rust Axum)
  - Bruno API testing collections

- **[license-oauth2-server](license-oauth2-server/)** - Keycloak OAuth2 server configuration
  - Docker Compose setup
  - Custom themes
  - Auto-import configurations

- **[license-product](license-product/)** - Product deployment configuration
  - Complete Docker Compose setup for production
  - Keycloak, PostgreSQL, and license server orchestration

- **[license-checker-java-client](license-checker-java-client/)** - Java client library
  - For integrating license validation into applications

- **[license-example-plugin](license-example-plugin/)** - Example plugin demonstrating license integration

## Technology Stack

### Backend

- **Java 25** - Primary backend language
- **Spring Boot 3.5.7** - Application framework
- **PostgreSQL** - Database
- **Rust** - Alternative implementation
- **Axum** - Rust web framework
- **MapStruct** - Bean mapping
- **Lombok** - Boilerplate reduction

### Frontend

- **Angular 20** - Frontend framework
- **Angular Material** - UI components
- **TypeScript** - Type-safe development
- **SCSS** - Styling

### Security & Infrastructure

- **Keycloak** - OAuth2/OIDC authentication
- **Docker & Docker Compose** - Containerization
- **OpenAPI 3.0** - API specification

## Getting Started

### Prerequisites

- Java 25+
- Maven 3.6+
- Node.js 18+ and npm
- Docker and Docker Compose
- Rust (for license-server-rs)

### Building the Project

Build all modules:

```bash
mvn clean install
```

Build specific modules:

```bash
# Build license server
cd license-server
mvn clean package

# Build Angular GUI
cd license-gui
npm install
npm run build
```

### Running with Docker Compose

#### Development Environment

1. Start OAuth2 server (Keycloak):

    ```bash
    cd license-oauth2-server
    docker-compose up -d
    ```

2. Start license server:

    ```bash
    cd license-server
    docker-compose up -d
    ```

3. Start GUI:

    ```bash
    cd license-gui
    docker-compose up -d
    # Or for development
    npm run dev
    ```

#### Production Environment

```bash
cd license-product
docker-compose up -d
```

### Configuration

For Linux/Docker environments, configure `host.docker.internal`:

```bash
sudo nano /etc/hosts
```

Add the following entry:

```text
172.17.0.1 host.docker.internal
```

## API Documentation

The API is defined using OpenAPI 3.0 specifications in [license-oas-api/openapi.yaml](license-oas-api/openapi.yaml).

### Key Endpoints

- `POST /key` - Generate a new license key
- `GET /key/{owner}` - Get license key for an owner
- `POST /key/{owner}` - Generate publisher-specific key
- `/license` - License management endpoints
- `/check` - License validation endpoints

### Authentication

All API endpoints require OAuth2 authentication with bearer tokens. Scopes include:

- `key:read` - Read license keys
- `key:write` - Generate/modify license keys

## 🧪 Testing

API testing collections are available in:

- [license-oas-api/bruno/](license-oas-api/bruno/) - Bruno API client collections
- [license-server/license.postman_collection.json](license-server/license.postman_collection.json) - Postman collection

## Development

### Code Generation

OpenAPI clients and servers can be regenerated:

```bash
cd license-oas-api

# Generate all
./deploy-all.sh

# Generate specific targets
./deploy-client-typescript-fetch.sh
./deploy-server-spring-boot.sh
```

### Frontend Development

```bash
cd license-gui
npm run dev
```

The Angular dev server runs at `http://localhost:4200/`

## Deployment

Each module contains Docker configuration:

- `Dockerfile` - Container image definition
- `docker-compose.yaml` - Service orchestration

The [license-product](license-product/) module provides a complete production setup.

## Contributing

This is a personal project for exploring new technologies. Feel free to explore the codebase and adapt it for your needs.

## License

This project is developed by netzkronehd for experimentation with modern software development technologies.

## Dodule Documentation

- [License Server README](license-server/README.md)
- [License GUI README](license-gui/README.md)
- [License Server Rust README](license-server-rs/README.md)
