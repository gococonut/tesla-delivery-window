import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req) {
  const body = await req.json(); // 解析请求体
  const { orderNum, token } = body;

  const url = "https://akamai-apigateway-vfx.tesla.cn/tasks";
  const params = {
    deviceLanguage: "zh",
    deviceCountry: "CN",
    referenceNumber: orderNum,
    appVersion: "4.37.5-2886",
  };
  const headers = {
    Authorization: `Bearer ${token}`,
    Host: "akamai-apigateway-vfx.tesla.cn",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-Hans",
    "Cache-Control": "no-cache",
    charset: "utf-8",
    "User-Agent": "Tesla/2886 CFNetwork/1568.100.1.2.1 Darwin/24.0.0",
    Connection: "keep-alive",
    "x-tesla-user-agent": "TeslaApp/4.37.5/b81662c4ab/ios/18.0.1",
    Accept: "*/*",
  };

  try {
    const response = await axios.get(url, { params, headers });
    const data = response.data;
    const messageTitle = data?.tasks?.scheduling?.card?.messageTitle;
    const messageBody = data?.tasks?.scheduling?.card?.messageBody;
    const estimatedDeliveryDates = `${messageTitle}${messageBody}`;

    if (messageTitle == undefined) {
      return NextResponse.json(
        { message: "token 已失效，请重新生成" },
        { status: 200 }
      );
    }

    let message = estimatedDeliveryDates
      ? estimatedDeliveryDates
      : "暂无交付窗口";
    if (
      !estimatedDeliveryDates &&
      data?.tasks?.scheduling?.deliveryWindowDisplay
    ) {
      message = `预计交付日期：${data?.tasks?.scheduling?.deliveryWindowDisplay}`;
    }

    if (data?.tasks?.registration?.orderDetails?.vin) {
      message = `${message} \n 车辆识别码（VIN）：${data.tasks.registration.orderDetails.vin}`;
    }

    return NextResponse.json(
      {
        message: `${message}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: `无效的订单号或 token`,
      },
      { status: 400 }
    );
  }
}
