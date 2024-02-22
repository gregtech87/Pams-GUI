FROM tomcat:latest

MAINTAINER gregtech87


COPY /images /usr/local/tomcat/webapps/ROOT/images
COPY /application.js /usr/local/tomcat/webapps/ROOT/application.js
COPY /appStuff.js /usr/local/tomcat/webapps/ROOT/appStuff.js
COPY /editUserStuff.js /usr/local/tomcat/webapps/ROOT/editUserStuff.js
COPY /fetches.js /usr/local/tomcat/webapps/ROOT/fetches.js
COPY /index.html /usr/local/tomcat/webapps/ROOT/index.html
COPY /login.js /usr/local/tomcat/webapps/ROOT/login.js
COPY /notifications.js /usr/local/tomcat/webapps/ROOT/notifications.js
COPY /sidebar.css /usr/local/tomcat/webapps/ROOT/sidebar.css
COPY /signup.js /usr/local/tomcat/webapps/ROOT/signup.js
COPY /stuff.css /usr/local/tomcat/webapps/ROOT/stuff.css
COPY /style.css /usr/local/tomcat/webapps/ROOT/style.css



EXPOSE 8080

