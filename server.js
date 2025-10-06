// 1. Importando as bibliotecas necessárias
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path'); // NOVO: Módulo para trabalhar com caminhos de arquivos

// 2. Configurações Iniciais
const app = express();
const port = 3000;

// NOVO: Habilitar o 'public' folder para servir arquivos estáticos (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// =======================================================================
// SUAS CREDENCIAIS AQUI
const url = 'mongodb+srv://alexmaceedo:XGKH0RiGwqPxzS66@cluster01.jfo8ott.mongodb.net';
// =======================================================================

const client = new MongoClient(url);
const dbName = 'reality_show_db';

async function main() {
    try {
        // 3. Conectando ao banco de dados
        await client.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');
        const db = client.db(dbName);
        const collection = db.collection('reality_shows');

        // 4. Definindo os Endpoints (as "rotas" da nossa API)

        // NOVO: Endpoint para buscar os dados de um reality específico para a página de votação
        app.get('/reality/:nome_reality', async (req, res) => {
            const { nome_reality } = req.params;
            console.log(`Buscando dados para o reality: ${nome_reality}`);
            const reality = await collection.findOne({ nome_reality: nome_reality });
            if (reality) {
                res.json(reality);
            } else {
                res.status(404).json({ message: 'Reality show não encontrado.' });
            }
        });

        // NOVO: Endpoint para VOTAR em um participante
        app.post('/votar/:realityId/:participanteNome', async (req, res) => {
            const { realityId, participanteNome } = req.params;
            console.log(`Recebido voto para ${participanteNome} no reality ${realityId}`);

            try {
                const realityObjectId = new ObjectId(realityId);
                const result = await collection.updateOne(
                    // Critério de busca: Encontre o reality pelo seu _id e o participante pelo nome dentro do array
                    { "_id": realityObjectId, "participantes.nome_participante": participanteNome },
                    // Operação de atualização: Incremente o campo 'votos' do participante encontrado
                    { $inc: { "participantes.$.votos": 1 } }
                );

                if (result.modifiedCount > 0) {
                    res.json({ success: true, message: 'Voto computado com sucesso!' });
                } else {
                    res.status(404).json({ success: false, message: 'Participante ou reality não encontrado.' });
                }
            } catch (e) {
                res.status(500).json({ success: false, message: 'Erro ao processar voto.', error: e.message });
            }
        });

        // Seus outros endpoints (premios, idade, maior, etc.) continuam aqui...
        app.get('/premios', async (req, res) => { /* ... seu código ... */ });
        app.get('/idade/:nome_reality', async (req, res) => { /* ... seu código ... */ });
        app.get('/maior/:valor', async (req, res) => { /* ... seu código ... */ });

        // 5. Iniciando o servidor
        app.listen(port, () => {
            console.log(`Servidor rodando! Acesse http://localhost:${port}/votacao.html`);
        });

    } catch (e) {
        console.error('Falha ao conectar ou configurar o servidor:', e);
    }
}

// 6. Executando a função principal
main();