Para rodar a aplicação é necessário ter o Node.js, o NPM (no instalador Node.js para windwos já instala o NPM junto) e o NodeRed rodando. Caso não tenha Node.js instalado, então acesse o link oficial do NODE: https://nodered.org/docs/getting-started/local e siga o passo a passo de intalação pertinente ao seu SO. É bem simples.

Com o Node.js e o NPM instalados, basta instalar o Node-Red, que também é bem simples de se realizar.

Para instalar o "nodeRed", acesse o link https://nodered.org/docs/getting-started/local e escolha a instalação pertinente para o seu SO. Após acessar o link e escolher a instalação voltada para o seu SO, então siga o passo a passo que o próprio site fornece.

Com o node.js, npm e o node-red instalados, agora é o momento de criar o servidor. Para isso, basta instalarmos o Apache (cria um servidor no seu próprio SO para poder simular um servidor remoto) e instalar um SGBD para criar o bancco de dados. Para facilitar as coisas e não haver problema algum, recomendo que opte pelo PHPMyAdmin, pois todas as configuraçãoes de conxeão com o banco está com a configuração padrão do PHPMyAdmin => usuario: root e senha: ""(em branco). Em suma, para facilitar esse processo, instale um "pacote de servidores de desenvolvimento local" - XAMPP, ou outro. Tem vários outros pacotes para a mesma finalidade.

Com o apache e o SGBD rodando, então basta rodar o script de criação do banco de dados que se encontra na pasta auxiliar/script-banco-de-dados.

Uma vez o banco de dados criado e rodando, então importe o arquivo de flows do Node-Red, que se encontra na pasta auxiliar/Node-red.

Por fim, instale um "editor de código de desenvolvimento. Um dos mais recomendados e usado devido a facilidade de se trabalhar com extensões e pela levaza quanto consumo de processamento da máquina é o Visual Studio Code.

Pronto!

Aaah, mas claro que não é um sistema pronto, que não está totalmente desenvolvido, é sistema iniciado a partir de um curso JS Profissional que fiz para fins de trabalhar os conhecimentos adquiridos e também buscar soluções, de forma autônoma, para algumas regras de negócio.  

Grato pela sua atenção e leitura do arquivo.
Obrigado!
