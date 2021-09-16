import bootpay from '@bootpay/server-rest-client';
import bootpayKey from "../config/bootpayKey.js";

bootpay.RestClient.setConfig(
	bootpayKey.ApplicationId,
	bootpayKey.PrivateKey
);

export default bootpay.RestClient;