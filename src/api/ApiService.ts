import axios from "axios";

export type ResponseType = {
	status: number
	data: {
		USD: number
	}
	USD?: number
}

export const ApiService = {
	url: 'https://min-api.cryptocompare.com/data/price',
	apiKey: 'edfa9ed5bab50594148024bf1e497096251f021fb0faaebd2f3249af9603b67a',
	async getData(name: string) {
		const response = await axios.get<ResponseType>(this.url, {
			params: {
				'fsym': name,
				'tsyms': 'USD',
				'api_key': this.apiKey
			}
		})
		return response.data
	}
}
