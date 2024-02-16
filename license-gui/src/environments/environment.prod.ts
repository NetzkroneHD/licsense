import * as pkg from '../../package.json';
import {Configuration} from '@license/license-api-client-typescript-fetch';

export const environment = {
  title: 'License Client ('+pkg.version+')',
  production: true,
  apiConfig: {
    licenseApi: new Configuration({
      basePath: "http://localhost:8080/license/api/v1".replace(/\/+$/, ""),
    }),
    licenseCheckApi: new Configuration({
      basePath: "http://localhost:8080/license/api/v1".replace(/\/+$/, ""),
    })
  },
}
