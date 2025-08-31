# Nebula Assignment

**Автор:** Herasymenko Oleh  
**Версія:** 1.0.0

---

## ADR

[Директорія ADR^ів проєкту](./adr)


## Запуск усіх сервісів в паралельному режимі
```
pnpm -r dev
```


## API Examples

### Users Service

#### Create User
```bash
curl -X POST http://localhost:3001/api/users \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Oleh Herasymenko"
  }'
```

---