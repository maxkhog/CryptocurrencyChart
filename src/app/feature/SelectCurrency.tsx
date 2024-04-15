import { Button } from "@/app/shared/ui";
import React from "react";

type Props = {
  currency: string;
  setCurrency: (currency: string) => void;
  data: {
    [key: string]: {
      id: number;
      symbol: string;
      partner_symbol: string;
      data_available_from: number;
    };
  };
};

export const SelectCurrency: React.FC<Props> = React.memo(
  ({ data, setCurrency, currency }) => {
    return (
      <select
        onChange={(e) => {
          setCurrency(e.target.value);
        }}
        id="currency"
        name="currency"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={currency}
      >
        {Object.values(data ?? {}).map(({ id, symbol }) => (
          <option key={id} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
    );
  }
);
