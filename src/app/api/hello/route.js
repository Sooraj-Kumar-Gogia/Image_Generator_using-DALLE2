import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

export async function POST(request) {
  
}

openai.createImage({
  file: 'https://i.imgur.com/3bQhjgj.jpeg',
  purpose: 'display'
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
});


export async function POST(request) {
  const { text } = await request.json()
  const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: text,
    maxTokens: 5,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ['\n', "testing"]
  })
  return new Response(JSON.stringify(gptResponse), {
    headers: {
      'content-type': 'application/json'
    }
  })
}
