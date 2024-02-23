FROM tomcat:latest

MAINTAINER gregtech87


COPY /images /usr/local/tomcat/webapps/ROOT/images
COPY /javascript/application.js /usr/local/tomcat/webapps/ROOT/application.js
COPY /javascript/appStuff.js /usr/local/tomcat/webapps/ROOT/appStuff.js
COPY /javascript/editUserStuff.js /usr/local/tomcat/webapps/ROOT/editUserStuff.js
COPY /javascript/fetches.js /usr/local/tomcat/webapps/ROOT/fetches.js
COPY /index.html /usr/local/tomcat/webapps/ROOT/index.html
COPY /javascript/login.js /usr/local/tomcat/webapps/ROOT/login.js
COPY /javascript/notifications.js /usr/local/tomcat/webapps/ROOT/notifications.js
COPY /css/sidebar.css /usr/local/tomcat/webapps/ROOT/sidebar.css
COPY /javascript/signup.js /usr/local/tomcat/webapps/ROOT/signup.js
COPY /css/stuff.css /usr/local/tomcat/webapps/ROOT/stuff.css
COPY /css/style.css /usr/local/tomcat/webapps/ROOT/style.css



EXPOSE 8080

