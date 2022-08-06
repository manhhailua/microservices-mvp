# Introduction

This repo is to provide a MVP of a system with microservices architecture.

# How to start

```
docker-compose up -d
```

Make sure you hare docker installed. After all services are ready, access `http://localhost:8080`.

# Components

## 1. api-gateway

A simple nginx instance stands as the entrypoint of the system and does 2 main features:

- routing: which path to which service
- introspecting: which request is authenticated

## 2. auth-service

Provide IAM features and help api-gateway to introspect the access token sending a long with all requests.

This service provides:

- login API: login with username/password
- introspect API: verify the access token

## 3. backend-service

A typical REST API service provide protected resources.

## 4. timekeeping-service

Another REST API service but named by domain. This service is just another type of backend service.

## 5. frontend-service

The portal.
