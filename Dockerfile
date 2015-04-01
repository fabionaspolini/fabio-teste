#docker images																	# listar imagens instaladas
#docker run -it centos bash 													# executar imagem e ficar no seu console (instalar do repositório oficial caso não exista)

#docker build -t docker-sample . 												# executar na pasta dos fontes para criar a imagem da aplicação, "docker-sample" será o nome da imagem, 
																				# para criar nova tag utilizar "docker-sample:nome_tag"

#docker ps 																		# ver containers em execução
#docker run -d --name mongo mongo												# executar imagem em background
#docker logs mongo																# visualizar log do bash do container (visualizar se já inicializou)
#docker inspect mongo															# json informações sobre o container
#docker stats mongo																# exibir recursos de máquina utilizado pelo container (cpu, memória, rede)

#docker run -d -p 3000:3000 --link mongo:mongo --name sample docker-sample		# criar link com o container mongo, especificar a porta 3000 do container da aplicação node para porta 3000 do servidor(Azure), 
																				# diz que o container com o nome "mongo" será utilizado com o nome "mongo" dentro do container do node,
																				# define o nome "sample" para o conteiner "docker-sample"
																				# liberar porta 3000 do servidor azure, e apontar ela para a porta externa 80 através do endpoint na interface do portal azure

#docker rmi id_imagem															# remover imagem do servidor
#docker stop docker-sample														# parar container
#docker start docker-sample														# iniciar container

#docker exec -it sample bash													# enviar comando para o container informando que quer entrar no bash dele.
																				# dentro do bash do container você pode efetuar alterações

#docker commit -m 'modificado arquivos' docker-sample							# salvar alteração do container
#docker push docker-sample														# publicar imagem no repositório oficial do docker


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