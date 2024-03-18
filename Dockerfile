FROM tomcat:latest

MAINTAINER gregtech87

#   Prepare deployment
#edit baseFetchUrl in shared.js

# Directories
COPY /images /usr/local/tomcat/webapps/ROOT/images
COPY /css /usr/local/tomcat/webapps/ROOT/css
COPY /javascript /usr/local/tomcat/webapps/ROOT/javascript
COPY /leaflet /usr/local/tomcat/webapps/ROOT/leaflet

# Pages
COPY /index.html /usr/local/tomcat/webapps/ROOT/index.html
COPY /application.html /usr/local/tomcat/webapps/ROOT/application.html

EXPOSE 8080

