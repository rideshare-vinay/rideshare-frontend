FROM node
WORKDIR /rideshare
COPY ./package.json /rideshare
RUN npm install -g @angular/cli
RUN npm install
COPY . /rideshare
EXPOSE 4200
CMD ng serve --host 0.0.0.0
