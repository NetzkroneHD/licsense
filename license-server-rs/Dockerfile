FROM rust:latest

ARG MODE=release

WORKDIR /home/app

COPY target/${MODE}/license-server-rs license-server-rs


EXPOSE 8080

CMD ["./license-server-rs"]