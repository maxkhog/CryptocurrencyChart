"use client";

import React from "react";
import API, {
  CryproCurrencyResponse,
  HourlyExchangeVolResponse,
} from "@/app/shared/ApiService";
import { Button, Loader } from "@/app/shared/ui";
import Charts from "./Charts";
import { IntervalButtons, SelectCurrency } from "@/app/feature";

const App = () => {
  const [currenciesData, setCurrenciesData] = React.useState<CryproCurrencyResponse | null>(null);
  const [hourlyExchangeVolData, setHourlyExchangeVolData] = React.useState<HourlyExchangeVolResponse | null>(
    null
  );
  const [currency, setCurrency] = React.useState<string>("BTC");
  const [interval, setIntervalData] = React.useState<number>(24);
  const [refresh, setRefresh] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    API.getCryproCurrency()
      .then((data) => {
        setCurrenciesData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (currenciesData === null) {
      return;
    }
    setLoading(true);

    API.getHistoHour(currency, interval)
      .then((data) => {
        setHourlyExchangeVolData(data);
      })
      .finally(() => setLoading(false));
  }, [currency, interval, refresh, currenciesData]);

  return (
    <div className="divide-y w-[800px] divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6 flex justify-around">
        <div className="flex flex-1 justify-around items-center">
          <IntervalButtons
            interval={interval}
            setIntervalData={setIntervalData}
          />
        </div>
        <div className="flex flex-1 items-center justify-between">
          <Button
            onClick={React.useCallback(
              () => setRefresh((v) => v + 1),
              [setRefresh]
            )}
          >
            Refresh
          </Button>
          <div className=" justify-self-end">
            <SelectCurrency
              data={currenciesData?.Data ?? {}}
              currency={currency}
              setCurrency={setCurrency}
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6 min-h-[480px] flex justify-center items-center">
        {loading ? (
          <Loader />
        ) : hourlyExchangeVolData?.Response === "Error" ? (
          hourlyExchangeVolData.Message
        ) : (
          <Charts
            TimeFrom={hourlyExchangeVolData?.TimeFrom}
            TimeTo={hourlyExchangeVolData?.TimeTo}
            data={hourlyExchangeVolData?.Data ?? []}
          />
        )}
      </div>
    </div>
  );
};

export default App;
