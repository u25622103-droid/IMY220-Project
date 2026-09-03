# BEAUTIFY - Photo Sharing Website

## Project Overview
BEAUTIFY is a photo sharing platform where photographers, artists, and dreamers 
come together to showcase their unique perspectives.

## Technologies Used
- Frontend: React + Vite
- Backend: Node.js + Express
- Containerization: Docker

## Prerequisites
- Docker installed on your machine
- Node.js (for local development)

## Test Account
- Email: test@test.com
- Password: test1234

## How to Run with Docker

### Build Images
```bash
# Build backend
cd backend
docker build -t beautify-backend .

# Build frontend
cd frontend
docker build -t beautify-frontend .

# Run backend on port 5000
docker run -d -p 5000:5000 --name beautify-backend beautify-backend

# Run frontend on port 5173
docker run -d -p 5173:5173 --name beautify-frontend beautify-frontend

# Access the Application

    Frontend: http://localhost:5173

    Backend API: http://localhost:5000

    Health Check: http://localhost:5000/api/health

# Github repo link:
https://github.com/u25622103-droid/IMY220-Project