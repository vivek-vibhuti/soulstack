# Use the official Maven image with JDK 17 for building
FROM maven:3.8.6-openjdk-17 AS build

# Set working directory
WORKDIR /app

# Copy the pom.xml and source code
COPY server/pom.xml .
COPY server/src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a slim JDK runtime image for running the application
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Ex@pose the port the app runs on (default for Spring Boot)
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]