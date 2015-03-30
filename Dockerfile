#docker build -t fabionaspolini/node-docker-sample .
#docker run -it centos bash

from centos

RUM rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

RUN yum install -y npm

COPY . / src

WORKDIR /src
RUN npm install

ENV NODE_ENV production

EXPOSE 3000

ENTRYPOINT ["node"]

CMD ["app.js"]