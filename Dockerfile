FROM keymetrics/pm2:latest-alpine
LABEL name="course-platform-server"
LABEL version="1.0"
COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn build
EXPOSE 8000
CMD ["pm2-runtime", "start", "process.yml"]
