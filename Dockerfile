FROM node
WORKDIR /rideshare
COPY . /rideshare
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4200
CMD ng serve --host 0.0.0.0
