# Use a multi-stage build to include both frontend and backend
# Stage 1: Build React frontend
FROM node:16 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Set up the Python backend and serve frontend
FROM python:3.9-slim AS backend
WORKDIR /app
# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ .

# Copy the built frontend from the first stage to the backend
COPY --from=frontend-build /app/frontend/build ./frontend_build

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expose the backend port
EXPOSE 5000

# Run the Flask server
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
