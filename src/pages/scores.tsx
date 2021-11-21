import { Flex } from '@chakra-ui/layout';
import { Spinner, useBreakpointValue, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from 'chakra-data-table';
import { NextPage } from 'next';
import router from 'next/router';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLetters } from '../store/slices/letters';
import { selectNickname } from '../store/slices/nickname';
import { getQuote } from '../store/slices/quote';
import { getScores, scoresSelect } from '../store/slices/scores';
import { startTimer } from '../store/slices/time';

const calcScore = (numOfErrors: number): number => {
  return Math.round((100 / (1 + numOfErrors)) * 100) / 100;
};

const allKeys = ['nickname', 'duration', 'errors', 'uniqueCharacters', 'length', 'score'] as const;
const mobileKeys = ['nickname', 'score'];

const ScorePage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data: scoreData = {}, pending } = useAppSelector(scoresSelect);
  const nickname = useAppSelector(selectNickname);
  const { incorrectLetters } = useAppSelector(selectLetters);

  useEffect(() => {
    if (!nickname) {
      router.push('/');
    }
    dispatch(getQuote());
    dispatch(getScores());
    dispatch(startTimer());
  }, [dispatch, nickname]);

  const calcScoreData = [
    ...Object.values(scoreData),
    { userName: nickname, errors: incorrectLetters },
  ]
    .map((r) => ({ ...r, nickname: r.userName, score: calcScore(r.errors) }))
    .sort((a, b) => b.score - a.score);

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const keys =
    (useBreakpointValue({
      base: mobileKeys,
      md: allKeys,
    }) as typeof allKeys) || allKeys;

  return (
    <>
      <Header />
      <Flex w="80%" maxW="1200px" marginX="auto" py="8">
        {pending ? (
          <Spinner />
        ) : (
          <DataTable
            striped
            data={calcScoreData}
            keys={keys}
            widths={{ uniqueCharacters: 40 }}
            labels={{ uniqueCharacters: 'Unique characters' }}
            tableProps={{
              td: { borderColor, borderWidth: `1px`, px: 4, py: 2 },
              th: { borderColor, borderWidth: `1px`, textAlign: 'center' },
            }}
            mapper={{
              nickname: [
                true,
                (r) => ({
                  textAlign: 'center',
                  ...(r.nickname === nickname ? { fontWeight: 'bold', color: 'orange' } : {}),
                }),
              ],

              duration: [true, { textAlign: 'right' }],
              errors: [true, { textAlign: 'right' }],
              length: [true, { textAlign: 'right' }],
              uniqueCharacters: [true, { textAlign: 'right' }],
              score: [true, { fontWeight: 'bold', textAlign: 'right' }],
            }}
          />
        )}
      </Flex>
    </>
  );
};

export default ScorePage;
