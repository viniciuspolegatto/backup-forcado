/* Arquivo server.js usado como motor para os arquivos STecSenai-lounge.html
STecSenai-pickCliente.html, STecSenai-dadosContrato.html, STecSenai-localStorage.html
STecSenai-contrato e STecSenai-consumir */

const https = require('https');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3306;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ************************** Pool de Conexões MySQL *************************
const db = mysql.createPool({
  connectionLimit: 10, // Limite máximo de conexões
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

// ************************** Rota para busca de CNPJ *************************
app.get('/cnpj/:cnpj', (req, res) => {
  const cnpj = req.params.cnpj;
  const options = {
    method: 'GET',
    hostname: 'receitaws.com.br',
    port: null,
    path: `/v1/cnpj/${cnpj}`,
    headers: { Accept: 'application/json' }
  };

  const apiReq = https.request(options, (apiRes) => {
    const chunks = [];
    apiRes.on('data', (chunk) => { chunks.push(chunk); });
    apiRes.on('end', () => {
      const body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
    });
  });

  apiReq.on('error', (e) => { res.status(500).send(e.message); });
  apiReq.end();
});

// ***************** Rota principal - Primeira página a ser aberta **************
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ************** Rota para adicionar dados ao banco de dados dos CONTRATOS *******************  
app.post('/addData', (req, res) => {
  const { info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34, info35, info36, info37 } = req.body;
  const query = 'INSERT INTO ContratoSebraetecSenai (NomePfSenaiST, CpfPfSenaiST, nascimentoPfSenaiST, telefonePfSenaiST, emailPfSenaiST, cepPfSenaiST, logradouroPfSenaiST, numeroResidenciaPfSenaiST, bairroPfSenaiST, municipioPfSenaiST, testemunhaNomeSenaiST, testemunhaCargoSenaiST, testemunhaCpfSenaiST, ServFamiliaSenaiST, servTituloSenaiST, servRaeSenaiST, servRMSenaiST, servValorSenaiST, servTipoSenaiST, servPublicoSenaiST, servQhoraSenaiST, servModalidadeSenaiST, cnpjPj, razaoPj, fantasiaPj, atividadePj, telefonePj, emailPj, socioPj, situacaoPj, logradouroPj, numeroPj, complementoPj, bairroPj, municipioPj, solicitanteSenaiST, VAR1) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34, info35, info36, info37], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados: ' + err.message);
      return;
    }
    console.log('Dados inseridos com sucesso:', result);
    res.send('Dados adicionados ao banco de dados');
  });
});

// ************** Rota para adicionar dados ao banco de dados dos CLIENTES *******************  
app.post('/addCliente', (req, res) => {
  const { info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34, info35, info36, info37, info38, info39 } = req.body;
  const query = 'INSERT INTO ClienteSebraetecSenai (ID_contrato, NomePfSenaiST, CpfPfSenaiST, nascimentoPfSenaiST, telefonePfSenaiST, emailPfSenaiST, cepPfSenaiST, logradouroPfSenaiST, numeroResidenciaPfSenaiST, bairroPfSenaiST, municipioPfSenaiST, testemunhaNomeSenaiST, testemunhaCargoSenaiST, testemunhaCpfSenaiST, ServFamiliaSenaiST, servTituloSenaiST, servRaeSenaiST, servRMSenaiST, servValorSenaiST, servTipoSenaiST, servPublicoSenaiST, servQhoraSenaiST, servModalidadeSenaiST, cnpjPj, razaoPj, fantasiaPj, atividadePj, telefonePj, emailPj, socioPj, situacaoPj, logradouroPj, numeroPj, complementoPj, bairroPj, municipioPj, procStarTec, numeroPasta, statusSTecSenai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34, info35, info36, info37, info38, info39 ], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados: ' + err.message);
      return;
    }
    console.log('Dados inseridos com sucesso:', result);
    res.send('Dados adicionados ao banco de dados');
  });
});

// ************************** Rota para buscar todos os cadastros para CONTRATO ***************
app.get('/buscarContrato', (req, res) => {
  const query = 'SELECT ID_Contrato, NomePfSenaiST, CpfPfSenaiST, municipioPfSenaiST, telefonePfSenaiST, razaoPj, fantasiaPj, municipioPj, telefonePj, emailPfSenaiST FROM ContratoSebraetecSenai';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    console.log('Dados encontrados:', results);
    res.json(results);
  });
});

// ************************** Rota para buscar todos os CLIENTES CONSUMIDORES SEBRAETEC ***************
app.get('/buscarCadastroClientes', (req, res) => {
  const query = 'SELECT ID, NomePfSenaiST, CpfPfSenaiST, telefonePfSenaiST, emailPfSenaiST, municipioPfSenaiST, testemunhaNomeSenaiST, servTituloSenaiST, servRaeSenaiST, servRMSenaiST, servValorSenaiST, servTipoSenaiST, servQhoraSenaiST, cnpjPj, razaoPj, fantasiaPj, municipioPj, telefonePj, emailPfSenaiST, procStarTec, numeroPasta, statusSTecSenai FROM ClienteSebraetecSenai';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    console.log('Dados encontrados:', results);
    res.json(results);
  });
});


// *********************** Rota para buscar dados por nome do cliente **********************
app.get('/buscarPorNome/:nomeCliente', (req, res) => {
  const nomeCliente = req.params.nomeCliente;
  // Use % para buscar um trecho do nome
  const query = 'SELECT * FROM ContratoSebraetecSenai WHERE NomePfSenaiST LIKE ?';

  // Adiciona % antes e depois do nomeCliente para busca parcial
  const searchParam = `%${nomeCliente}%`;

  db.query(query, [searchParam], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    console.log('Dados encontrados:', results);
    res.json(results);
  });
});



// ******************** Rota para buscar dados por ID_Contrato ***************** 
app.get('/buscarPorIdContrato/:idContrato', (req, res) => {
  const idContrato = req.params.idContrato;
  const query = 'SELECT * FROM ContratoSebraetecSenai WHERE ID_Contrato = ?';

  db.query(query, [idContrato], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    console.log('Dados encontrados:', results);
    res.json(results);
  });
});


// ************ Rota para atualizar as informações do cliente com base no ID_CLIENTE
app.put('/atualizarCliente', (req, res) => {
  const { idCliente, status, numeroPasta, numeroProcesso } = req.body;
  const query = `
    UPDATE ClienteSebraetecSenai
    SET statusSTecSenai = ?, numeroPasta = ?, procStarTec = ?
    WHERE ID = ?`;

  db.query(query, [status, numeroPasta, numeroProcesso, idCliente], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar os dados:', err);
      res.status(500).send('Erro ao atualizar os dados: ' + err.message);
      return;
    }
    console.log('Dados atualizados com sucesso:', result);
    res.send('Informações atualizadas com sucesso');
  });
});


// ************************** Inicialização do Servidor *************************
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});





/* Arquivo server.js usado como motor para os arquivos STecSenai-lounge.html
STecSenai-pickCliente.html, STecSenai-dadosContrato.html, STecSenai-localStorage.html
STecSenai-contrato e STecSenai-consumir

const https = require('https');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3306;


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ************************** Rota para busca de CNPJ *************************
app.get('/cnpj/:cnpj', (req, res) => {
  const cnpj = req.params.cnpj;
  const options = {
    method: 'GET',
    hostname: 'receitaws.com.br',
    port: null,
    path: `/v1/cnpj/${cnpj}`,
    headers: { Accept: 'application/json' }
  };

  const apiReq = https.request(options, (apiRes) => {
    const chunks = [];
    apiRes.on('data', (chunk) => { chunks.push(chunk); });
    apiRes.on('end', () => {
      const body = Buffer.concat(chunks);
      res.json(JSON.parse(body.toString()));
    });
  });

  apiReq.on('error', (e) => { res.status(500).send(e.message); });
  apiReq.end();
});


// ******************** Configuração do banco de dados - Acesso *****************
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});


// ***************** Rota principal - Primeira página a ser aberta **************
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// ************** Rota para adicionar dados ao banco de dados dos CONTRATOS*******************  
app.post('/addData', (req, res) => {
  const { info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34, info35, info36, info37} = req.body; // variáveis da String "data" no scriptColetorDeDados.js
  const query = 'INSERT INTO ContratoSebraetecSenai (NomePfSenaiST, CpfPfSenaiST, nascimentoPfSenaiST, telefonePfSenaiST, emailPfSenaiST, cepPfSenaiST, logradouroPfSenaiST, numeroResidenciaPfSenaiST, bairroPfSenaiST, municipioPfSenaiST, testemunhaNomeSenaiST, testemunhaCargoSenaiST, testemunhaCpfSenaiST, ServFamiliaSenaiST, servTituloSenaiST, servRaeSenaiST, servRMSenaiST, servValorSenaiST, servTipoSenaiST, servQhoraSenaiST, servModalidadeSenaiST, cnpjPj, razaoPj, fantasiaPj, atividadePj, telefonePj, emailPj, socioPj, situacaoPj, logradouroPj, numeroPj, complementoPj, bairroPj, municipioPj, solicitanteSenaiST, VAR1, VAR2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  console.log('Dados recebidos:', { info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34, info35, info36, info37 });

  db.query(query, [info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34, info35, info36, info37], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados: ' + err.message);
      return;
    }
    console.log('Dados inseridos com sucesso:', result);
    res.send('Dados adicionados ao banco de dados');
  });
});


// ************** Rota para adicionar dados ao banco de dados dos CLIENTES *******************  
app.post('/addCliente', (req, res) => {
  const { info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34} = req.body; // variáveis da String "data" no scriptColetorDeDados.js
  const query = 'INSERT INTO ClienteSebraetecSenai (NomePfSenaiST, CpfPfSenaiST, nascimentoPfSenaiST, telefonePfSenaiST, emailPfSenaiST, cepPfSenaiST, logradouroPfSenaiST, numeroResidenciaPfSenaiST, bairroPfSenaiST, municipioPfSenaiST, testemunhaNomeSenaiST, testemunhaCargoSenaiST, testemunhaCpfSenaiST, ServFamiliaSenaiST, servTituloSenaiST, servRaeSenaiST, servRMSenaiST, servValorSenaiST, servTipoSenaiST, servQhoraSenaiST, servModalidadeSenaiST, cnpjPj, razaoPj, fantasiaPj, atividadePj, telefonePj, emailPj, socioPj, situacaoPj, logradouroPj, numeroPj, complementoPj, bairroPj, municipioPj ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  console.log('Dados recebidos:', { info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34 });

  db.query(query, [info01, info02, info03, info04, info05, info06, info07, info08, info09, info10, info11, info12, info13, info14, info15, info16, info17, info18, info19, info20, info21, info22, info23, info24, info25, info26, info27, info28, info29, info30, info31, info32, info33, info34 ], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados: ' + err.message);
      return;
    }
    console.log('Dados inseridos com sucesso:', result);
    res.send('Dados adicionados ao banco de dados');
  });
});


// ************************** Rota para buscar todos os cadastros para CONTRATO ***************
app.get('/buscarContrato', (req, res) => {
  const query = 'SELECT ID_Contrato, NomePfSenaiST, CpfPfSenaiST, municipioPfSenaiST, telefonePfSenaiST, razaoPj, fantasiaPj, municipioPj, telefonePj, emailPfSenaiST  FROM ContratoSebraetecSenai';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    console.log('Dados encontrados:', results);
    res.json(results);
  });
});


// ************************** Rota para buscar todos os CLIENTES CONSUMIDORES SEBRAETEC ***************
app.get('/buscarCadastroClientes', (req, res) => {
  const query = 'SELECT ID, NomePfSenaiST, CpfPfSenaiST, telefonePfSenaiST, emailPfSenaiST, municipioPfSenaiST, testemunhaNomeSenaiST, servTituloSenaiST, servRaeSenaiST, servRMSenaiST, servValorSenaiST, servTipoSenaiST, servQhoraSenaiST, cnpjPj, razaoPj, fantasiaPj, municipioPj, telefonePj, emailPfSenaiST  FROM ClienteSebraetecSenai';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    console.log('Dados encontrados:', results);
    res.json(results);
  });
});


// *********************** Rota para buscar dados por CPF **********************
app.get('/buscarPorCpf/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const query = 'SELECT * FROM ContratoSebraetecSenai WHERE CpfPfSenaiST = ?';
  
  db.query(query, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    console.log('Dados encontrados:', results);
    res.json(results);
  });
});


// ******************** Rota para buscar dados por ID_Contrato ***************** 
app.get('/buscarPorIdContrato/:idContrato', (req, res) => {
  const idContrato = req.params.idContrato;
  const query = 'SELECT * FROM ContratoSebraetecSenai WHERE ID_Contrato = ?';
  
  db.query(query, [idContrato], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados: ' + err.message);
      return;
    }
    console.log('Dados encontrados:', results);
    res.json(results);
  });
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/