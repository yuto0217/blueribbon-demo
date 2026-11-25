import { Fragment, useMemo } from 'react'

/**
 * 日本語の短い文を、文節（「お部屋が」「あります。」など）の切れ目でだけ改行させる。
 * CSS の word-break: auto-phrase は Safari（iPhone）では効かず、言葉の途中で改行されるため、
 * Intl.Segmenter で単語に分けて文節にまとめ、文節の切れ目に <wbr> を入れる（要素は keep-all で、<wbr> の位置だけで折り返す）。
 * 1つの文節が横幅に収まらないときは overflow-wrap で折り返す。
 */
export function Phrase({ text }: { text: string }) {
  const phrases = useMemo(() => splitPhrases(text), [text])
  return (
    <span className="[word-break:keep-all] [overflow-wrap:anywhere]">
      {phrases.map((phrase, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {phrase}
        </Fragment>
      ))}
    </span>
  )
}

const HIRAGANA = /^\p{Script=Hiragana}/u
const CLOSING = /^[ー、。，．・：）」』】〕！？!?,.:;)\]]/u
const SOFT_END = /[\p{Script=Hiragana}、。・！？）」』】〕\s]$/u
const HONORIFIC = /^[おご]/u

/** 文節の切れ目：ひらがな・句読点・空白で終わった後に、漢字・カタカナ・数字・英字（と「お」「ご」＋漢字）が来るところ */
function splitPhrases(text: string): string[] {
  if (typeof Intl === 'undefined' || !('Segmenter' in Intl)) return [text]
  const segments = Array.from(new Intl.Segmenter('ja', { granularity: 'word' }).segment(text), (s) => s.segment)
  const phrases: string[] = []
  let afterPrefix = false
  segments.forEach((segment, i) => {
    const prev = phrases.at(-1)
    // 「お部屋」「ご宿泊」のように、お・ご＋漢字などは言葉の始まり（「ご」「宿泊」と分かれたときは次とつなげる）
    const rest = segment.length > 1 ? segment.slice(1) : (segments[i + 1] ?? '')
    const isPrefix = HONORIFIC.test(segment) && rest !== '' && !HIRAGANA.test(rest)
    const startsWord = isPrefix || (!HIRAGANA.test(segment) && !CLOSING.test(segment) && !/^\s/.test(segment))
    if (prev !== undefined && (afterPrefix || !(startsWord && SOFT_END.test(prev)))) phrases[phrases.length - 1] = prev + segment
    else phrases.push(segment)
    afterPrefix = isPrefix && segment.length === 1
  })
  return phrases
}
