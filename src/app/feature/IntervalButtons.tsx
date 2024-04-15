import { Button } from "@/app/shared/ui";
import React from "react";

type Props = {
  interval: number;
  setIntervalData: (data: number) => void;
};

const times = {
  "1 day": 24,
  "3 days": 24 * 3,
  week: 24 * 7,
  month: 24 * 31,
};

export const IntervalButtons: React.FC<Props> = React.memo(
  ({ interval, setIntervalData }) => {
    const isActive = React.useCallback(
      (v: number) => interval === v,
      [interval]
    );
    return (
      <>
        {Object.entries(times).map(([time, data]) => {
          return (
            <Button
              key={time}
              active={isActive(data)}
              onClick={React.useCallback(
                () => setIntervalData(data),
                [setIntervalData]
              )}
            >
              {time}
            </Button>
          );
        })}
      </>
    );
  }
);
