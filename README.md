### Terminal eines Containers öffnen
"`docker exec -it <container-name-or-id> bash`"

### Exportieren des Keycloak-Realms
1. Terminal des Keycloak containers öffnen
2. "`/opt/bitnami/keycloak/bin/kc.sh export --dir /keycloak-transfer/ --users realm_file`" ausführen
3. Dateien befinden sich in "`/keycloak/exports`"

### Importieren des Keycloak-Realms
1. Realms in den Ordner "`/keycloak/exports`" ablegen
2. Terminal des Keycloak containers öffnen
3. "`/opt/bitnami/keycloak/bin/kc.sh import --dir /keycloak-transfer/`" ausführen