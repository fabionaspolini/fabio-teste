#docker run -it centos bash
#docker build -t fabionaspolini/node-angular-express-docker .

from centos:centos7

RUM rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUM rpm -Uvh http://mirror.globo.com/epel/epel-release-latest-7.noarch.rpm

RUN yum install -y npm

COPY . / src

WORKDIR /src
RUN npm install

ENV NODE_ENV production

EXPOSE 3000

ENTRYPOINT ["node"]

CMD ["app.js"]