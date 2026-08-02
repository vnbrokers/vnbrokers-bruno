# VNBrokers

[Tiếng Việt](README.vi.md)

## Introduction
**vnbrokers-bruno** is a collection of OpenAPIs from Vietnamese Securities Companies

## Setup
1. Clone the repository
```bash
git clone https://github.com/vnbrokers/vnbrokers-bruno.git
```

2. Open workspace into Bruno application

3. Copy a environment for each Broker Open API collection and set up the variables/secrets

 - **DNSEv2**: Setup `apiKey` and `apiSecret` in environment, and set `otp` in request Get `trading-token`. `x-signature`, `date`
 - **TCBS**: Setup `apiKey` and `otp` in environment.

    Bruno Pre Request script in collection level will set `accessToken` back to environment variable `accessToken` to build a Authorization header for next requests.

 - **SSI**: Setup `consumerID` and `consumerSecret` in environment


## Development

```bash
cd vnbrokers-bruno

mise trust
mise install
mise run gen-githooks

git checkout -b testing

```

## References

- [DNSE API Platform](https://developers.dnse.com.vn/docs/guide/intro/api_platform)
- [Entrade](https://hdsd2.entrade.com.vn/entrade-api)
- [FireAnt RESTful API v1](https://api.fireant.vn/)
- [SSI FastConnect Data](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-data)
- [SSI FastConnect Trading](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-trading)
- [TCBS iFlash Open API](https://developers.tcbs.com.vn/)
- [Bruno Variables](https://docs.usebruno.com/variables/overview)
- [FHSC OpenAPI](https://fhsc.com.vn/)

## Disclaimer

This project is provided for technical reference and development purposes only. It is not financial, investment, legal, tax, or trading advice. APIs, data, authentication flows, and broker requirements may change without notice. Use this project at your own risk and verify all requests, responses, and trading actions with the official broker documentation before using them in any real account or production system.

The maintainers are not responsible for any loss, damage, incorrect order, failed order, account issue, data error, service interruption, or other consequence arising from the use of this project.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.
