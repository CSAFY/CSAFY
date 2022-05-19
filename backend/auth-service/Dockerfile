FROM openjdk:11-jdk

WORKDIR /app/auth-service

COPY build/libs/*.jar auth-service-0.0.1-SNAPSHOT.jar

EXPOSE 20000

CMD ["java", "-jar", "auth-service-0.0.1-SNAPSHOT.jar"]