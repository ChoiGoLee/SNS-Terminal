import { useState } from 'react'

import Avatar from './Avatar'

type Message = 'me' | 'other'

interface MessageBubbleProps {
  type: Message
  text: string
  userName?: string
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  text,
  userName = '알수없는 사용자',
}) => {
  // 더보기 상태 열림/닫힘
  const [showMore, setShowMore] = useState(false)

  const isLong = text.length > 100

  const displayText = showMore
    ? text
    : text.slice(0, 100) + (isLong ? '...' : '')

  if (type === 'other') {
    return (
      <div className="flex justify-start p-4 gap-2 w-96">
        <Avatar userName={userName} size={'md'} />
        <div className="bg-background-surface rounded-2xl w-auto max-w-64 py-3">
          <p className="px-4">{displayText}</p>
          {isLong && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[#A7A7A7] text-sm mt-4 text-end w-full border-t-[1px] pt-3 border-t-[#505050] px-4"
            >
              {showMore ? '접기' : '더보기'}
            </button>
          )}
        </div>
      </div>
    )
  }

  if (type === 'me') {
    return (
      <div className="flex justify-end p-4 gap-2">
        <div className="bg-primary rounded-2xl w-auto max-w-64 py-3 text-black">
          <p className="px-4">{displayText}</p>
          {isLong && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[#445640] text-sm mt-4 text-end w-full border-t-[1px] pt-3 border-t-[#505050] px-4"
            >
              {showMore ? '접기' : '더보기'}
            </button>
          )}
        </div>
      </div>
    )
  }
  return null
}

// 샘플 메시지들

interface SampleMessage {
  type: Message
  text: string
  userName?: string
}

export const sampleMessages: SampleMessage[] = [
  {
    type: 'other',
    text: 'LOSER 외톨이 센 척하는 겁쟁이 못된 양아치 거울 속에 넌 JUST A LOSER 외톨이 상처뿐인 머저리 더러운 쓰레기 거울 속에 난 I’M A 솔직히 세상과 난 어울린 적 없어 홀로였던 내겐 사랑 따윈 벌써 잊혀 진지 오래 저 시간 속에 더 이상은 못 듣겠어 희망찬 사랑 노래 너나 나나 그저 길들여진 대로 각본 속에 놀아나는 슬픈 삐에로 난 멀리 와버렸어 I’M COMING HOME 이제 다시 돌아갈래 어릴 적 제자리로',
    userName: 'Loser',
  },
  {
    type: 'me',
    text: '안녕하세요! 반갑습니다.',
  },
  {
    type: 'other',
    text: '이것은 엄청나게 긴 메세지인데요. 얼마나 써야 더보기가 나오는지 모르겠네요. 이렇게해도 아직도 안나와요. 그래서 말인데요 마무말이나 좀 써볼려고해요 이해해주세요. 한줄만 더 쓰면 될거같네요.',
  },
  {
    type: 'me',
    text: `왜들 그리 다운돼있어? 뭐가 문제야 say something 분위기가 겁나 싸해 요새는 이런 게 유행인가 왜들 그리 재미없어? 아 그건 나도 마찬가지 Tell me what I got to do 급한 대로 블루투스 켜 아무 노래나 일단 틀어 아무거나 신나는 걸로 아무렇게나 춤춰 아무렇지 않아 보이게 아무 생각 하기 싫어 아무개로 살래 잠시 I'm sick and tired of my every day, keep it up 한 곡 더`,
  },
  {
    type: 'other',
    text: '이것은 엄청나게 긴 메세지인데요. 얼마나 써야 더보기가 나오는지 모르겠네요. 이렇게해도 아직도 안나와요. 그래서 말인데요 마무말이나 좀 써볼려고해요 이해해주세요. 한줄만 더 쓰면 될거같네요.',
  },
  {
    type: 'other',
    text: '이것은 엄청나게 긴 메세지인데요. 얼마나 써야 더보기가 나오는지 모르겠네요. 이렇게해도 아직도 안나와요. 그래서 말인데요 마무말이나 좀 써볼려고해요 이해해주세요. 한줄만 더 쓰면 될거같네요.',
  },
]
