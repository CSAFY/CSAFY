FROM openjdk:11-jdk

WORKDIR /app/eureka-service

COPY build/libs/*.jar eureka-0.0.1-SNAPSHOT.jar

EXPOSE 8761

CMD ["java", "-jar", "eureka-0.0.1-SNAPSHOT.jar"]