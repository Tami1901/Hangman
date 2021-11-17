import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getQuote, quoteSelector } from "../features";

const Quote: NextPage = () => { 
  const dispatch = useAppDispatch();
  const {
    data, 
    pending,
    error,
  } = useAppSelector(quoteSelector)

  return (
    <div>
      <h2>Hangman</h2>
      {pending && <p>Loading...</p>}
      {data && <p>{data.content}</p>}
      {error && <p>Oops, something went wrong</p>}
      <button onClick={() => dispatch(getQuote())} disabled={pending}>
        Generate new quote
      </button>
    </div>
  )
}

export default Quote;