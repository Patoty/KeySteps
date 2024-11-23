"use server"
import type {NextApiRequest, NextApiResponse} from 'next'

type ResponseData = {
	message: String
	
}

const token = "6a01979b-64e1-46cd-adff-69ff574f27c2";

//get listings
export default async function POST() {

	fetch("https://api.thinkimmo.com/organization/integrations/alert", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"AuthorizationAPI": token,
		},
		body: JSON.stringify({
			"customer_id": "0",
  			"alertSettings": {},
			"filter": {}
		}),
	}).then(res => {
		const data = res.json();

		console.log(data);
	});
}
