FROM openjdk:11-jdk

WORKDIR /app/chat-service

COPY build/libs/*.jar chat-service-0.0.1-SNAPSHOT.jar

EXPOSE 12000

CMD ["java", "-jar", "chat-service-0.0.1-SNAPSHOT.jar"]