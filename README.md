### Trading Simulator App
Overview
```
The Trading Simulator App is a web-based platform built with Next.js that allows users to simulate trading activities in a risk-free environment. Users can practice trading strategies, track performance, and interact with a simulated market without using real money. The app leverages Firebase for backend services and state management.
```

# Features
```
Real-time trading simulation

User portfolio tracking

Historical trade performance

Interactive charts and dashboards

Responsive design for desktop and mobile
```

# Technology Stack
```
Frontend: Next.js, React

Backend / Database: Firebase Firestore

Styling: PostCSS

Containerization: Docker (production-ready image)

Deployment: Kubernetes (optional for local or cloud deployment)
```

# Installation Prerequisites
```
Node.js v18+

npm v9+

Docker (for containerized deployment)

(Optional) K3s/Kubernetes for local cluster deployment
```

# Local Setup
```
Clone the repository:
git clone <repository-url>
cd trading-sim

Install dependencies:
npm ci

Run the development server:
npm run dev

OR

Skip last two steps and move to Docker Setup below
P.S. npm run dev without a docker containerization only ensure the codebase is not broken

Open http://localhost:3000 to view the app (if you ran npm ci or npm run dev)
```
# Docker Setup
```
Build the Docker Image
docker build -t trading-sim-app .

Run the Container
docker run -d -p 3000:3000 trading-sim-app

Access the app at http://localhost:3000
```
