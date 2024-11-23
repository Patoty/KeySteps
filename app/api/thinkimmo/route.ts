"use server"

//const token = "6a01979b-64e1-46cd-adff-69ff574f27c2";

export async function POST(request: Request) {
	const res = await request.json()
  return Response.json({ res })
}