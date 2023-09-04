export const FETCH_STATUS = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

export type StatusType = keyof typeof FETCH_STATUS;
