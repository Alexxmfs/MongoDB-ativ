/*
  Este script contém o JSON Schema Validator para a coleção 'reality_shows'.
  Para configurar o banco de dados pela primeira vez, conecte-se via mongosh,
  apague a coleção antiga com `db.reality_shows.drop()`,
  selecione o banco com `use reality_show_db` e cole todo o comando `db.createCollection(...)` abaixo.

  Este validador garante a integridade e a estrutura dos dados inseridos na coleção.
*/

// Comando para ser executado no mongosh:
db.createCollection("reality_shows", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validação de Documento de Reality Show",
      required: [ "nome_reality", "emissora", "participantes" ],
      properties: {
        nome_reality: {
          bsonType: "string",
          description: "'nome_reality' deve ser uma string e é um campo obrigatório."
        },
        emissora: {
          bsonType: "string",
          description: "'emissora' deve ser uma string e é um campo obrigatório."
        },
        audiencia_pontos: {
          bsonType: "int",
          description: "'audiencia_pontos' deve ser um número inteiro."
        },
        participantes: {
          bsonType: "array",
          description: "'participantes' deve ser um array de objetos e é um campo obrigatório.",
          minItems: 1, // Exige que tenha pelo menos 1 participante no array
          items: {
            bsonType: "object",
            title: "Validação de Documento de Participante",
            required: ["nome_participante", "idade", "votos"],
            properties: {
              nome_participante: {
                bsonType: "string",
                description: "O nome do participante deve ser uma string e é obrigatório."
              },
              idade: {
                bsonType: "int",
                minimum: 18,
                description: "Idade deve ser um inteiro e o valor mínimo é 18."
              },
              votos: {
                bsonType: "int",
                description: "Votos deve ser um inteiro."
              },
              premios: {
                bsonType: "array",
                description: "'premios' deve ser um array de objetos.",
                items: {
                  bsonType: "object",
                  title: "Validação de Documento de Prêmio",
                  required: ["nome_premio", "valor"],
                  properties: {
                    nome_premio: { 
                        bsonType: "string",
                        description: "'nome_premio' deve ser uma string e é obrigatório."
                    },
                    valor: { 
                        bsonType: "int",
                        description: "'valor' deve ser um inteiro e é obrigatório."
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
})