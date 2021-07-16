import { RestClient } from '@bootpay/server-rest-client';
import bootpayKey from "../config/bootpayKey";

RestClient.setConfig(
	bootpayKey.ApplicationId,
	bootpayKey.PrivateKey
);

export default RestClient;