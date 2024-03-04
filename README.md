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


### Neue Keys generieren

#### Private Key:
1. "`openssl genpkey -algorithm RSA -out license-key-private.pem`": Generiert den Key im falschen Format
2. "`openssl pkcs8 -topk8 -inform PEM -outform DER -in license-key-private.pem -out license-key-private.der -nocrypt`": Konvertiert in das `pkcs8 ` Format.

Private Key ist in der Datei "`license-key-private.der`" gespeichert.

#### Public Key:
1. "`openssl rsa -in license-key-private.pem -pubout -out license-key-public.pem`": Generiert den Key im falschen Format
2. "`openssl rsa -pubin -inform PEM -in license-key-public.pem -outform DER -out license-key-public.der`": Konvertiert in das `pkcs8 ` Format.

Public Key ist in der Datei "`license-key-public.der`" gespeichert.
