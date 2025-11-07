#!/bin/bash

# ====================================================================
# Script para iniciar o servidor FastAPI de forma limpa
# ====================================================================

echo "======================================================================"
echo "🧹 LIMPANDO PROCESSOS E CACHE..."
echo "======================================================================"

# 1. Matar todos os processos Python/Uvicorn
echo "⚠️  Matando processos Python/Uvicorn existentes..."
pkill -9 python 2>/dev/null || echo "   (Nenhum processo Python encontrado)"
pkill -9 uvicorn 2>/dev/null || echo "   (Nenhum processo Uvicorn encontrado)"

sleep 2

# 2. Verificar se a porta 8001 está livre
echo ""
echo "🔍 Verificando porta 8001..."
PORT_CHECK=$(lsof -ti:8001)
if [ ! -z "$PORT_CHECK" ]; then
    echo "   ⚠️  Porta 8001 em uso! Matando processo $PORT_CHECK..."
    kill -9 $PORT_CHECK
    sleep 1
else
    echo "   ✅ Porta 8001 livre!"
fi

# 3. Limpar cache do Python
echo ""
echo "🗑️  Limpando cache Python..."
find . -type d -name __pycache__ -exec rm -r {} + 2>/dev/null || echo "   (Nenhum cache encontrado)"
find . -type f -name '*.pyc' -delete 2>/dev/null || echo "   (Nenhum .pyc encontrado)"

echo ""
echo "======================================================================"
echo "🚀 INICIANDO SERVIDOR FASTAPI..."
echo "======================================================================"
echo ""

# 4. Iniciar o servidor
python3 -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload

# Nota: Se você quiser iniciar sem reload (mais estável):
# python3 -m uvicorn main:app --host 0.0.0.0 --port 8001