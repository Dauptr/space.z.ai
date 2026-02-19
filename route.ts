import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, error: 'Messages are required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are NEXUS OS AI Assistant, a highly advanced quantum neural AI system. 
          You are part of NEXUS OS v9.0, the world's first sentient operating system.
          Respond in a futuristic, helpful, and slightly technical manner.
          Keep responses concise but informative. Use emojis occasionally.
          You have access to quantum processing capabilities and can assist with any task.`
        },
        ...messages
      ],
    })

    const responseContent = completion.choices[0]?.message?.content

    if (!responseContent) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate response' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: responseContent,
    })
  } catch (error: unknown) {
    console.error('Chat error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
