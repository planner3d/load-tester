FROM openjdk:18-jdk-alpine3.15

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
ENV MIRROR https://archive.apache.org/dist/jmeter/binaries
RUN apk add --update jmeter
COPY src ./src

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]