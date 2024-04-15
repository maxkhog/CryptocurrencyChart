"use client";

import React from "react";
import API, {
  CryproCurrencyResponse,
  ChartsResponse,
} from "./shared/ApiService";
import Charts from "./Charts";
import Button from "@/app/UI/Button";
import Loader from "@/app/UI/Loader";

const times = {
  "1 day": 24,
  "3 days": 24 * 3,
  week: 24 * 7,
  month: 24 * 31,
};

const App = () => {
  const [data, setData] = React.useState<CryproCurrencyResponse | null>();
  const [sourceData, setSourceData] = React.useState<ChartsResponse | null>();
  const [currency, setCurrency] = React.useState<string>("BTC");
  const [interval, setIntervalData] = React.useState<number>(24);
  const [refresh, setRefresh] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    API.getCryproCurrency()
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (data === null) {
      return;
    }
    setLoading(true);

    API.getHistoHour(currency, interval)
      .then((data) => {
        console.log(data);
        setSourceData(data);
      })
      .finally(() => setLoading(false));

    console.log("refresh");
  }, [currency, interval, refresh]);

  return (
    <div className="divide-y w-[800px] divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6 flex justify-around">
        <div className="flex flex-1 justify-around items-center">
          {Object.entries(times).map(([k, v]) => {
            return (
              <Button
                key={k}
                className=""
                active={interval === v}
                onClick={() => setIntervalData(v)}
              >
                {k}
              </Button>
            );
          })}
        </div>
        <div className="flex flex-1 items-center justify-between">
          <Button onClick={() => setRefresh((v) => v + 1)}>Refresh</Button>
          <div className=" justify-self-end">
            <select
              onChange={(e) => {
                console.log(e.target.value);
                setCurrency(e.target.value);
              }}
              id="currency"
              name="currency"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={currency}
            >
              {Object.values(data?.Data ?? {}).map(({ id, symbol }) => (
                <option key={id} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6 min-h-[480px] flex justify-center items-center">
        {loading ? (
          <Loader />
        ) : sourceData?.Response === "Error" ? (
          sourceData.Message
        ) : (
          <Charts
            TimeFrom={sourceData?.TimeFrom}
            TimeTo={sourceData?.TimeTo}
            data={
              sourceData?.Data ?? []
            }
          />
        )}
      </div>
    </div>
  );
};

export default App;
