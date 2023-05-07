import {Configuration, OpenAIApi} from 'openai'
import config from 'config'

import {createReadStream} from 'fs'

// gpt-3.5-turbo and gpt-4
class OpenAI {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'assistant',
        SYSTEM: 'system',
    }

    constructor(apiKey) {
        const configuration = new Configuration({
            apiKey,
        });
        this.openai = new OpenAIApi(configuration);
        this.models = {
            GPT3: 'gpt-3.5-turbo',
            GPT4: 'gpt-4'
        }
    }

    async chat(messages) {
        try {
            const response = await this.openai.createChatCompletion({
                model: this.models.GPT3,
                messages
            })
            return  response.data.choices[0].message
        } catch (e) {
            console.log(` Error gpt chat !!!`, e.message)
        }
    }

    async transcription(filepath) {
        try {
            const response = await this.openai.createTranscription(
                createReadStream(filepath),
                'whisper-1'
            )
            return response.data.text
        } catch (e) {
            console.log(` Error transcription !!!`, e.message)
        }
    }

}

export const openai = new OpenAI(config.get('OPEN_KEY'))