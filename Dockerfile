FROM node:18

RUN apt-get update && apt-get -y install cron

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN crontab cron.d

CMD ["cron", "-f"]
