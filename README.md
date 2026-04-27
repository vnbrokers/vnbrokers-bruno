# VNBrokers

## Introduction
**vnbrokers-bruno** is a collection of OpenAPIs from Vietnamese Securities Companies

## Setup
1. Clone the repository
```bash
git clone https://github.com/vnbrokers/vnbrokers-bruno.git
```

2. Import workspace into Bruno application

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
mise generate git-pre-commit --write --task=check-leaks

git checkout -b testing

```

## References

- [DNSE API Platform](https://developers.dnse.com.vn/docs/guide/intro/api_platform)
- [SSI FastConnect Data](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-data)
- [SSI FastConnect Trading](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-trading)
- [TCBS iFlash Open API](https://developers.tcbs.com.vn/)

- [Bruno Variables](https://docs.usebruno.com/variables/overview)
