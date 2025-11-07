import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
import logging
import sys
import os
from datetime import datetime

# ====================================================================
# CONFIGURAÇÃO DE LOGGING DETALHADA
# ====================================================================
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ====================================================================
# IDENTIFICAÇÃO DA VERSÃO (CRÍTICO PARA DEBUG)
# ====================================================================
CODIGO_VERSAO = "4.0-DEBUG-ENQUEUE"
TIMESTAMP_INICIO = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# ====================================================================
# CRIAÇÃO DO APP
# ====================================================================
app = FastAPI(title="BTrust Backend Produtor", version=CODIGO_VERSAO)

# Evento de startup para log de versão
@app.on_event("startup")
async def startup_event():
    logger.info("=" * 70)
    logger.info(f"🚀 SERVIDOR INICIADO - VERSÃO: {CODIGO_VERSAO}")
    logger.info(f"📅 Timestamp: {TIMESTAMP_INICIO}")
    logger.info(f"📁 Arquivo: {__file__}")
    logger.info(f"📂 Diretório: {os.path.dirname(os.path.abspath(__file__))}")
    logger.info(f"🐍 Python: {sys.version}")
    logger.info(f"🎯 PID do Processo: {os.getpid()}")
    logger.info("=" * 70)

# ====================================================================
# CORS
# ====================================================================
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====================================================================
# CREDENCIAIS DO QSTASH (ENQUEUE)
# ====================================================================
QSTASH_TOKEN = "eyJVc2VySUQiOiJhZjA0MmRjZC1kZDVkLTQ4NGEtOTE2NC03OWQ1ZjdkM2VjNDQiLCJQYXNzd29yZCI6ImQ2NWQ5OTFmNzBmODRkMWFhNmNkODY2MWMzYmVlYzRmIn0="
QSTASH_ENQUEUE_URL = "https://qstash.upstash.io/v2/enqueue/requests/https://castiel-preterritorial-lan.ngrok-free.dev/chroma_db"

# Log da configuração
logger.info(f"🔑 QStash Token configurado: {QSTASH_TOKEN[:20]}...")
logger.info(f"🎯 QStash URL: {QSTASH_ENQUEUE_URL}")

# ====================================================================
# MODELO PYDANTIC
# ====================================================================
class MensagemUsuario(BaseModel):
    chatId: str = Field(..., description="ID único do chat")
    texto: str = Field(..., description="O texto da pergunta do usuário")
    arquivos: list[str] = Field(default=[], description="Lista de nomes de arquivos PDF")

# ====================================================================
# ROTA DE TESTE (VERSÃO)
# ====================================================================
@app.get("/")
def read_root():
    """Rota de teste para confirmar a versão do código"""
    logger.info(f"✅ Rota / acessada - Versão: {CODIGO_VERSAO}")
    return {
        "mensagem": f"Backend BTrust Produtor - {CODIGO_VERSAO}",
        "timestamp_inicio": TIMESTAMP_INICIO,
        "pid": os.getpid(),
        "qstash_url": QSTASH_ENQUEUE_URL
    }

# ====================================================================
# ENDPOINT PRINCIPAL (ENFILEIRAR)
# ====================================================================
@app.post("/api/enviar_mensagem")
async def enfileirar_mensagem(mensagem: MensagemUsuario):
    """
    Recebe a mensagem do React e a enfileira no QStash.
    
    IMPORTANTE: Esta versão usa a API de ENQUEUE, não PUBLISH.
    Não há 'destination_url' nesta implementação.
    """
    logger.info("=" * 70)
    logger.info(f"🔥 ENDPOINT /api/enviar_mensagem CHAMADO - VERSÃO: {CODIGO_VERSAO}")
    logger.info(f"📦 Payload recebido:")
    logger.info(f"   - chatId: {mensagem.chatId}")
    logger.info(f"   - texto: {mensagem.texto[:50]}..." if len(mensagem.texto) > 50 else f"   - texto: {mensagem.texto}")
    logger.info(f"   - arquivos: {mensagem.arquivos}")
    logger.info(f"🎯 URL QStash: {QSTASH_ENQUEUE_URL}")
    logger.info(f"🔑 Token: {QSTASH_TOKEN[:20]}...")
    
    # Headers para o QStash
    headers = {
        "Authorization": f"Bearer {QSTASH_TOKEN}",
        "Content-Type": "application/json"
    }
    
    # Payload que o consumidor receberá
    payload_para_consumidor = mensagem.model_dump()
    
    payload_para_qstash = {
        "json": payload_para_consumidor 
    }
    
    logger.info(f"📤 Enviando para QStash...")
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                QSTASH_ENQUEUE_URL,
                json=payload_para_qstash,
                headers=headers
            )
            
            logger.info(f"📡 Resposta QStash:")
            logger.info(f"   - Status: {response.status_code}")
            logger.info(f"   - Body: {response.text}")
            
            if response.status_code >= 300:
                logger.error(f"❌ ERRO ao enfileirar no QStash!")
                logger.error(f"   - Status: {response.status_code}")
                logger.error(f"   - Resposta: {response.text}")
                raise HTTPException(
                    status_code=502,
                    detail=f"Falha ao enfileirar mensagem. QStash respondeu com: {response.text}"
                )
            
            # Sucesso!
            response_data = response.json()
            message_id = response_data.get('messageId', 'N/A')
            
            logger.info(f"✅ Mensagem enfileirada com sucesso!")
            logger.info(f"   - MessageID: {message_id}")
            logger.info("=" * 70)
            
            return {
                "status": "ok",
                "detalhe": "Mensagem recebida e enfileirada para processamento.",
                "messageId": message_id,
                "versao": CODIGO_VERSAO
            }
            
    except httpx.RequestError as exc:
        logger.error(f"❌ ERRO DE REDE ao conectar ao QStash: {exc}")
        logger.error("=" * 70)
        raise HTTPException(
            status_code=504,
            detail=f"Não foi possível conectar ao QStash: {str(exc)}"
        )
    
    except Exception as e:
        logger.error(f"❌ ERRO INESPERADO: {type(e).__name__}: {str(e)}")
        logger.error("=" * 70)
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno: {str(e)}"
        )

# ====================================================================
# ROTA DE HEALTH CHECK
# ====================================================================
@app.get("/health")
def health_check():
    """Verifica se o servidor está respondendo"""
    return {
        "status": "healthy",
        "versao": CODIGO_VERSAO,
        "pid": os.getpid(),
        "timestamp": datetime.now().isoformat()
    }

# ====================================================================
# EXECUÇÃO DIRETA
# ====================================================================
if __name__ == "__main__":
    logger.info("=" * 70)
    logger.info(f"🚀 Iniciando servidor na porta 8001...")
    logger.info(f"📌 VERSÃO: {CODIGO_VERSAO}")
    logger.info("=" * 70)
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="info")
    
    