import { useIsFetching } from "@tanstack/react-query";

export default function GlobalFetchingIndicator() {
  const isFetching = useIsFetching;

  return (
    <>
      {isFetching() ?? <span>Fetching...</span>}
    </>
  )
}