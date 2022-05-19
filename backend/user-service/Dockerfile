FROM openjdk:11-jdk

WORKDIR /app/user-service

COPY build/libs/*.jar user-service-0.0.1-SNAPSHOT.jar

EXPOSE 10000

CMD ["java", "-jar", "user-service-0.0.1-SNAPSHOT.jar"]