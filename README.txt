Para rodar a aplicação é necessário ter o Node.js, o NPM (no instalador Node.js para windwos já instala o NPM junto) e o Node-Red rodando. Caso não tenha Node.js instalado, então acesse o link oficial do NODE: https://nodered.org/docs/getting-started/local e siga o passo a passo de intalação pertinente ao seu SO. É bem simples.

Com o Node.js e o NPM intalados, basta agora instalar o Node-Red, que também é bem simples de se realizar.

Para instalar o "node-red", acesse o link https://nodered.org/docs/getting-started/local e escolha a instalação pertinente para o seu SO. Após acessar o link e escolher a instalação voltada para o seu SO, então siga o passo a passo que o próprio site fornece, muito simples.

Com o node.js, npm e o node-red instalados, agora é o momento de criar o servidor. Para isso, basta instalarmos o Apache (cria um servidor no seu próprio SO para poder simular um servidor remoto) e instalar um SGBD para criar o bancco de dados. Para facilitar as coisas e não haver problema algum, recomendo que opte pelo PHPMyAdmin, pois todas as configuraçãoes de conxeão com o banco está com a connfiguração padrão do PHPMyAdmin => usuario: root e senha: ""(em branco). Em suma, para facilitar esse processo, intale um "pacote de servidores de desenvolvimento local" - XAMPP, ou outro. Tem vários outros pacotes para a mesma finalidade.

Com o apache e o SGBD reddando, então basta rodar o script de criação do banco de dados que se encontra na pasta auxiliar/script-banco-de-dados.

Uma vez o banco de dados criado e rodando, então importe o arquivo de flows do Node-Red, que se encontra na pasta auxiliar/Node-red.

Por fim, instale um "editor de código de desenvolvimento. Um dos mais recomendados e usado devido a facilidade de se trabalhar com extensões e pela levaza quanto consumo de processamento da máquina é o Visual Studio.

Pronto!

Aaah, mas claro que não é um sistema pronto, é um sitema em que eu fiz uso do conhecimento adquirido, e de muita busca por conhecimento e exemplos durante o desenvovimento desse projeto, que se for olhar pelo ponto de vista de um sitema completo: ainda etá longe, mas a ideia aqui não é postar um sistema completo, mas sim, poder compartilhar conhecimentos e mostar minha forma de trabalhar, minha lógica de raciocínio e poder ter noção de como fui evoluindo a cada linha de código, pois não mudei quase nada a cada evolução do código, já que é de extrama importãncia ter ideia de como evoluímos com o trabalho, com a busca, com os erros de dias após dias. Todavia, pretendo dar continuidade ao desenvolvimento desse sistema com novas funções, telas etc; porém, não sei se continuarei em JS puro ou se passerei tudo para Type e daí partir para a cuntinuidade. Talvez, até mesmo passando o bakcend para PHP8.

Grato pela sua atenção e leitura do arquivo.
Obrigado!