import React, { useEffect } from 'react';
import { useBreakpointValue, useColorModeValue, Flex } from '@chakra-ui/react';
import { DataTable } from 'chakra-data-table';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectLetters } from '../store/slices/letters';
import { selectNickname } from '../store/slices/nickname';
import { getScores, scoresSelect, ScoreType } from '../store/slices/scores';
import { calcScore } from '../helpers/calcScore';
import { timeFormat } from '../helpers/timeFormat';
import { selectGames } from '../store/slices/games';
import { selectQuote } from '../store/slices/quote';

const allKeys = ['nickname', 'duration', 'errors', 'uniqueCharacters', 'length', 'score'] as const;
const mobileKeys = ['nickname', 'score'];

const ScorePage: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data: scoreData, pending } = useAppSelector(scoresSelect);
  const nickname = useAppSelector(selectNickname);
  const games = useAppSelector(selectGames);

  const router = useRouter();
  useEffect(() => {
    if (!nickname) {
      router.push('/');
    }

    dispatch(getScores());
  }, [dispatch, nickname, router]);

  const calcScoreData = [...scoreData, ...games]
    .map((r) => ({
      ...r,
      nickname: r.userName,
      score: calcScore({
        err: r.errors,
        unique: r.uniqueCharacters,
        len: r.length,
        duration: r.duration,
      }),
    }))
    .sort((a, b) => b.score - a.score);

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const keys =
    (useBreakpointValue({
      base: mobileKeys,
      md: allKeys,
    }) as typeof allKeys) || allKeys;

  return (
    <Flex w="90%" maxW="1200px" marginX="auto" py="8">
      <DataTable
        striped
        title="Leaderboard"
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

          duration: [(r) => timeFormat(r.duration / 1000), { textAlign: 'right' }],
          errors: [(r) => r.errors.toString(), { textAlign: 'right' }],
          length: [true, { textAlign: 'right' }],
          uniqueCharacters: [true, { textAlign: 'right' }],
          score: [true, { fontWeight: 'bold', textAlign: 'right' }],
        }}
      />
    </Flex>
  );
};

export default ScorePage;
