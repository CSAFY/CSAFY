FROM openjdk:11-jdk

WORKDIR /app/gateway

COPY build/libs/*.jar gateway-0.0.1-SNAPSHOT.jar

EXPOSE 8000

CMD ["java", "-jar", "gateway-0.0.1-SNAPSHOT.jar"]