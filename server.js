const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path'); 

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));


const url = 'mongodb+srv://alexmaceedo:XGKH0RiGwqPxzS66@cluster01.jfo8ott.mongodb.net';

const client = new MongoClient(url);
const dbName = 'reality_show_db';

async function main() {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');
        const db = client.db(dbName);
        const collection = db.collection('reality_shows');

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

        app.post('/votar/:realityId/:participanteNome', async (req, res) => {
            const { realityId, participanteNome } = req.params;
            console.log(`Recebido voto para ${participanteNome} no reality ${realityId}`);

            try {
                const realityObjectId = new ObjectId(realityId);
                const result = await collection.updateOne(
                    { "_id": realityObjectId, "participantes.nome_participante": participanteNome },
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

        app.get('/premios', async (req, res) => { });
        app.get('/idade/:nome_reality', async (req, res) => {  });
        app.get('/maior/:valor', async (req, res) => {  });

        app.listen(port, () => {
            console.log(`Servidor rodando! Acesse http://localhost:${port}/votacao.html`);
        });

    } catch (e) {
        console.error('Falha ao conectar ou configurar o servidor:', e);
    }
}

main();
