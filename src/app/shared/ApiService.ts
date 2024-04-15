export type CryproCurrencyResponse = {
  Response: string;
  Message: string;

  Data: {
    [key: string]: {
      id: number;
      symbol: string;
      partner_symbol: string;
      data_available_from: number;
    };
  };
};

export type HourlyExchangeVolResponse = {
  Response: string;
  Message: string;
  TimeFrom: number;
  TimeTo: number;
  Data: {
    time: number;
    volume: number;
  }[];
};
class API {
  url = "https://min-api.cryptocompare.com/data/";

  fetcher = (url: string) => {
    const newUrl = new URL(url);
    newUrl.searchParams.append(
      "api_key",
      "b53793d143f8e10be3d2718b6771f664737274c02190c2fb4b05c4f143eebfee"
    );

    return fetch(newUrl);
  };

  async getCryproCurrency(): Promise<CryproCurrencyResponse> {
    const data = await this.fetcher(`${this.url}blockchain/list`)
      .then((res) => res.json())
      .catch((e) => console.log(e));

    return data;
  }

  async getHistoHour(
    currency: string,
    limit: number = 100
  ): Promise<HourlyExchangeVolResponse> {
    const data = await this.fetcher(
      `${this.url}exchange/histohour?tsym=${currency}&limit=${limit}&e=Binance`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));

    return data;
  }
}

export default new API();
