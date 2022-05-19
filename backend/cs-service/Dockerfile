FROM openjdk:11-jdk

WORKDIR /app/cs-service

COPY build/libs/*.jar cs-service-0.0.1-SNAPSHOT.jar

EXPOSE 11000

CMD ["java", "-jar", "cs-service-0.0.1-SNAPSHOT.jar"]