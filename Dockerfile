#docker images														# lista imagens instaladas
#docker run -it centos bash 										# executar imagem e ficar no seu console (instalar do repositório oficial caso não exista)
#docker build -t fabionaspolini/node-angular-express-docker . 		# executar na pasta dos fontes "fabionaspolini/node-angular-express-docker" é o nome da imagem (docker images para consultas depois), para criar nova tag adicionar :nome_tag
#docker ps 															# ver containers em execução
#docker run -d --name mongo mongo									# executar imagem em background
#docker logs mongo													# visualizar log do bash do container (visualizar se já inicializou)
#docker inspect mongo												# json informações sobre o container
#docker stats mongo													# exibir recursos de máquina utilizado pelo container (cpu, memória, rede)

#docker run -d -p 3000:3000 --link mongo:mongo --name sample fabionaspolini/node-angular-express-docker		# criar link com o container mongo, especifica a porta 3000 do container para porta 3000 do servidor(Azure), 
																											# diz que o container com o nome "mongo" será utilizado com o nome "mongo",
																											# define o nome "sample" para o conteiner fabio.../node...

#liberar porta 3000 do servidor azure, e apontar ela para a porta externa 80 através do endpoint na interface do portal azure


from centos:centos7

#RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN rpm -Uvh http://mirror.globo.com/epel/epel-release-latest-7.noarch.rpm

RUN yum install -y npm

COPY . /src

WORKDIR /src
RUN npm install

ENV NODE_ENV production

EXPOSE 3000

ENTRYPOINT ["node"]

CMD ["app.js"]