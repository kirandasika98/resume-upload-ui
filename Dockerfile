FROM alpine:latest
WORKDIR /app
# Run update on alpine and create ssl certificates
RUN apk update \
    && apk add ca-certificates \
    && rm -rf /var/cache/apk/*
# Copy executable from current directory
COPY ./main .
# Copy static assets from current directory
COPY ./static/. ./static
ENTRYPOINT ["./main"]
