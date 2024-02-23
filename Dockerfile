FROM tomcat:latest

MAINTAINER gregtech87

# Directories
COPY /images /usr/local/tomcat/webapps/ROOT/images
COPY /css /usr/local/tomcat/webapps/ROOT/css
COPY /javascript /usr/local/tomcat/webapps/ROOT/javascript

# Pages
COPY /index.html /usr/local/tomcat/webapps/ROOT/index.html
COPY /application.html /usr/local/tomcat/webapps/ROOT/application.html

#COPY /javascript/application.js /usr/local/tomcat/webapps/ROOT/application.js
#COPY /javascript/appStuff.js /usr/local/tomcat/webapps/ROOT/appStuff.js
#COPY /javascript/editUserStuff.js /usr/local/tomcat/webapps/ROOT/editUserStuff.js
#COPY /javascript/fetches.js /usr/local/tomcat/webapps/ROOT/fetches.js
#COPY /javascript/login.js /usr/local/tomcat/webapps/ROOT/login.js
#COPY /javascript/notifications.js /usr/local/tomcat/webapps/ROOT/notifications.js
#COPY /javascript/shared.js /usr/local/tomcat/webapps/ROOT/shared.js
#COPY /javascript/signup.js /usr/local/tomcat/webapps/ROOT/signup.js

#COPY /css/login.css /usr/local/tomcat/webapps/ROOT/login.css
#COPY /css/shared.css /usr/local/tomcat/webapps/ROOT/shared.css
#COPY /css/sidebar.css /usr/local/tomcat/webapps/ROOT/sidebar.css
#COPY /css/stuff.css /usr/local/tomcat/webapps/ROOT/stuff.css
#COPY /css/style.css /usr/local/tomcat/webapps/ROOT/style.css



EXPOSE 8080

