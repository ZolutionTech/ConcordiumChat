import { Accessor, createEffect } from 'solid-js'

import { BotMessageTheme, TextInputTheme, UserMessageTheme } from '@/features/bubble/types'
import { Badge } from './Badge'
import ChatContainer from './ChatContainer'

export type BotProps = {
  chatflowid: string
  apiHost?: string
  chatflowConfig?: Record<string, unknown>
  welcomeMessage?: string
  botMessage?: BotMessageTheme
  userMessage?: UserMessageTheme
  textInput?: TextInputTheme
  poweredByTextColor?: string
  badgeBackgroundColor?: string
  fontSize?: number
  toggleBot?: () => void
  isBotOpened?: Accessor<boolean>
  botScrollContainer?: HTMLDivElement | undefined
}

/*const sourceDocuments = [
    {
        "pageContent": "I know some are talking about “living with COVID-19”. Tonight – I say that we will never just accept living with COVID-19. \r\n\r\nWe will continue to combat the virus as we do other diseases. And because this is a virus that mutates and spreads, we will stay on guard. \r\n\r\nHere are four common sense steps as we move forward safely.  \r\n\r\nFirst, stay protected with vaccines and treatments. We know how incredibly effective vaccines are. If you’re vaccinated and boosted you have the highest degree of protection. \r\n\r\nWe will never give up on vaccinating more Americans. Now, I know parents with kids under 5 are eager to see a vaccine authorized for their children. \r\n\r\nThe scientists are working hard to get that done and we’ll be ready with plenty of vaccines when they do. \r\n\r\nWe’re also ready with anti-viral treatments. If you get COVID-19, the Pfizer pill reduces your chances of ending up in the hospital by 90%.",
        "metadata": {
          "source": "blob",
          "blobType": "",
          "loc": {
            "lines": {
              "from": 450,
              "to": 462
            }
          }
        }
    },
    {
        "pageContent": "sistance,  and  polishing  [65].  For  instance,  AI  tools  generate\nsuggestions based on inputting keywords or topics. The tools\nanalyze  search  data,  trending  topics,  and  popular  queries  to\ncreate  fresh  content.  What’s  more,  AIGC  assists  in  writing\narticles and posting blogs on specific topics. While these tools\nmay not be able to produce high-quality content by themselves,\nthey can provide a starting point for a writer struggling with\nwriter’s block.\nH.  Cons of AIGC\nOne of the main concerns among the public is the potential\nlack  of  creativity  and  human  touch  in  AIGC.  In  addition,\nAIGC sometimes lacks a nuanced understanding of language\nand context, which may lead to inaccuracies and misinterpre-\ntations. There are also concerns about the ethics and legality\nof using AIGC, particularly when it results in issues such as\ncopyright  infringement  and  data  privacy.  In  this  section,  we\nwill discuss some of the disadvantages of AIGC (Table IV).",
        "metadata": {
          "source": "blob",
          "blobType": "",
          "pdf": {
            "version": "1.10.100",
            "info": {
              "PDFFormatVersion": "1.5",
              "IsAcroFormPresent": false,
              "IsXFAPresent": false,
              "Title": "",
              "Author": "",
              "Subject": "",
              "Keywords": "",
              "Creator": "LaTeX with hyperref",
              "Producer": "pdfTeX-1.40.21",
              "CreationDate": "D:20230414003603Z",
              "ModDate": "D:20230414003603Z",
              "Trapped": {
                "name": "False"
              }
            },
            "metadata": null,
            "totalPages": 17
          },
          "loc": {
            "pageNumber": 8,
            "lines": {
              "from": 301,
              "to": 317
            }
          }
        }
    },
    {
        "pageContent": "Main article: Views of Elon Musk",
        "metadata": {
          "source": "https://en.wikipedia.org/wiki/Elon_Musk",
          "loc": {
            "lines": {
              "from": 2409,
              "to": 2409
            }
          }
        }
    },
    {
        "pageContent": "First Name: John\nLast Name: Doe\nAddress: 120 jefferson st.\nStates: Riverside\nCode: NJ\nPostal: 8075",
        "metadata": {
          "source": "blob",
          "blobType": "",
          "line": 1,
          "loc": {
            "lines": {
              "from": 1,
              "to": 6
            }
          }
        }
    },
]*/

export const WebBot = (props: BotProps & { class?: string }) => {
  let botContainer: HTMLDivElement | undefined
  let bottomSpacer: HTMLDivElement | undefined

  createEffect(() => {
    if (props.fontSize && botContainer) botContainer.style.fontSize = `${props.fontSize}px`
  })

  return (
    <>
      <div
        ref={botContainer}
        class={
          'relative flex w-full h-full text-base  bg-cover bg-center flex-col items-center chatbot-container ' +
          props.class
        }
        style={{
          'z-index': 42424242,
        }}
      >
        {/* Top bar  */}
        <div
          class='absolute right-2 top-2 '
          style={{
            'z-index': 42424242,
          }}
        >
          {/* <h2
            style={{
              'font-size': '20px',
              'font-weight': 600,
              color: '#303235',
            }}
          >
            Beta
          </h2> */}

          <button
            part='button'
            onClick={() => props.toggleBot?.()}
            class={`w-7 h-7  shadow-md rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in`}
          >
            <svg
              viewBox='0 0 24 24'
              style={{ fill: '#303235' }}
              class='absolute duration-200 transition w-3 h-3'
            >
              <line x1='0' y1='0' x2='24' y2='24' stroke='#333' stroke-width='2' />
              <line x1='0' y1='24' x2='24' y2='0' stroke='#333' stroke-width='2' />
            </svg>
          </button>
        </div>

        {/* Chat window */}
        <ChatContainer {...props} />

        {/* Bottom section below text input */}
        <Badge
          badgeBackgroundColor={props.badgeBackgroundColor}
          poweredByTextColor={props.poweredByTextColor}
          botContainer={botContainer}
        />

        <BottomSpacer ref={bottomSpacer} />
      </div>
    </>
  )
}

type BottomSpacerProps = {
  ref: HTMLDivElement | undefined
}
const BottomSpacer = (props: BottomSpacerProps) => {
  return <div ref={props.ref} class='w-full h-32' />
}
