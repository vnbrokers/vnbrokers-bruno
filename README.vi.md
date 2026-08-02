# VNBrokers

[English](README.md)

## Giới thiệu
**vnbrokers-bruno** là bộ sưu tập OpenAPI của các công ty chứng khoán Việt Nam.

## Cài đặt
1. Clone repository
```bash
git clone https://github.com/vnbrokers/vnbrokers-bruno.git
```
 Hoặc tải dự án về và giải nén vào thư mục tuỳ chọn

2. **Open workspace** trong ứng dụng Bruno tại như mục có chứa tập tin `workspace.yml`

3. Sao chép một environment cho từng bộ sưu tập Open API của mỗi công ty chứng khoán và thiết lập các biến/secret

 - **DNSEv2**: Thiết lập `apiKey` và `apiSecret` trong environment, và thiết lập `otp` trong request Get `trading-token`. `x-signature`, `date`

   Truy vấn `Lấy thông tin tài khoản giao dịch` đầu tiên để tự động lấy `accountNo` và Bruno Pre Request script sẽ tự cập nhật lại vào biến môi trường

 - **TCBS**: Thiết lập `apiKey` và `otp` trong environment.

    Bruno Pre Request script ở cấp collection sẽ gán lại `accessToken` vào biến environment `accessToken` để tạo Authorization header cho các request tiếp theo khi gọi request `2.1.1. Trao đổi API Key để lấy JWT Token`

 - **SSI**: Thiết lập `consumerID` và `consumerSecret` trong environment

   * Đối với FastConnect Data, chọn *Environment* `environments/SSI.Data.yml`, chỉ cần nhập `consumerID` và `consumerSecret`.   


   * Đối với FastConnect Data, chọn *Environment* `environments/SSI.Trading.yml`, cần nhập `consumerID`, `consumerSecret` và `privateKey` cho mục đích ký số.

   Truy vấn `Token/Lấy Access Token` để lấy `accessToken`, Bruno Pre Request script ở cấp collection sẽ gán lại `accessToken` vào biến environment `accessToken` để tạo Authorization header cho các request tiếp theo.

## Phát triển

```bash
cd vnbrokers-bruno

mise trust
mise install
mise run gen-githooks

git checkout -b testing

```

## Tham khảo

- [DNSE API Platform](https://developers.dnse.com.vn/docs/guide/intro/api_platform)
- [Entrade](https://hdsd2.entrade.com.vn/entrade-api)
- [FireAnt RESTful API v1](https://api.fireant.vn/)
- [SSI FastConnect Data](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-data)
- [SSI FastConnect Trading](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-trading)
- [TCBS iFlash Open API](https://developers.tcbs.com.vn/)
- [Bruno Variables](https://docs.usebruno.com/variables/overview)
- [FHSC OpenAPI](https://fhsc.com.vn/)

## Miễn trừ trách nhiệm

Dự án này chỉ được cung cấp cho mục đích tham khảo kỹ thuật và phát triển. Đây không phải là tư vấn tài chính, đầu tư, pháp lý, thuế hoặc giao dịch. API, dữ liệu, quy trình xác thực và yêu cầu của công ty chứng khoán có thể thay đổi mà không báo trước. Bạn tự chịu rủi ro khi sử dụng dự án này và cần kiểm tra mọi request, response và thao tác giao dịch với tài liệu chính thức của công ty chứng khoán trước khi dùng với tài khoản thật hoặc hệ thống production.

Nhóm duy trì dự án không chịu trách nhiệm cho bất kỳ tổn thất, thiệt hại, lệnh sai, lệnh thất bại, vấn đề tài khoản, lỗi dữ liệu, gián đoạn dịch vụ hoặc hậu quả nào khác phát sinh từ việc sử dụng dự án này.

## License

Dự án này được cấp phép theo Apache License 2.0. Xem [LICENSE](LICENSE) để biết thêm chi tiết.
