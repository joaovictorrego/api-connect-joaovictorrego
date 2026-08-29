#!/usr/bin/env bash
set -u

BASE_URL="http://localhost:3000"
RESULTS_FILE="/home/ubuntu/api-connect/test-results.json"

request() {
  local name="$1"
  local method="$2"
  local url="$3"
  local payload="${4:-}"
  local body_file="/tmp/api-connect-${name}.body"
  local status

  if [ -n "$payload" ]; then
    status=$(curl --silent --show-error --output "$body_file" --write-out "%{http_code}" \
      -X "$method" "$url" \
      -H "Content-Type: application/json" \
      -d "$payload")
  else
    status=$(curl --silent --show-error --output "$body_file" --write-out "%{http_code}" \
      -X "$method" "$url")
  fi

  python3 - "$name" "$method" "$url" "$payload" "$status" "$body_file" <<'PY'
import json
import sys
from pathlib import Path

name, method, url, payload, status, body_file = sys.argv[1:]
path = Path("/home/ubuntu/api-connect/test-results.json")
results = json.loads(path.read_text()) if path.exists() else []
body_text = Path(body_file).read_text().strip()
try:
    response = json.loads(body_text) if body_text else None
except json.JSONDecodeError:
    response = body_text
results.append({
    "scenario": name,
    "request": {
        "method": method,
        "url": url,
        "body": json.loads(payload) if payload else None,
    },
    "status": int(status),
    "response": response,
})
path.write_text(json.dumps(results, ensure_ascii=False, indent=2) + "\n")
PY
}

printf '[]\n' > "$RESULTS_FILE"
request "criacao-sucesso" "POST" "$BASE_URL/api/users" '{"name":"Marina Oliveira","email":"marina.oliveira@example.com"}'
request "criacao-sem-email" "POST" "$BASE_URL/api/users" '{"name":"Usuário sem e-mail"}'
request "listagem-geral" "GET" "$BASE_URL/api/users"
request "busca-id-inexistente" "GET" "$BASE_URL/api/users/99999"

python3 - "$RESULTS_FILE" <<'PY'
import json
import sys
from pathlib import Path

results = json.loads(Path(sys.argv[1]).read_text())
expected = [201, 400, 200, 404]
actual = [item["status"] for item in results]
print(json.dumps(results, ensure_ascii=False, indent=2))
if actual != expected:
    raise SystemExit(f"Status inesperado: {actual}; esperado: {expected}")
PY
