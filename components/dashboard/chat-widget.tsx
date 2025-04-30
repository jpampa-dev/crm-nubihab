"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Paperclip, Send, X, MessageCircle, Smile, Mic, MapPin, User2} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
  read: boolean
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you with your real estate needs today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Mark all messages as read when opening chat
      setUnreadCount(0)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (newMessage.trim() === "") return

    let userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      read: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsLoading(true)

    // Show loading message from agent
    const loadingMessage: Message = {
      id: "loading",
      content: "Processing...",
      sender: "agent",
      timestamp: new Date(),
      read: isOpen,
    }
    setMessages((prev) => [...prev, loadingMessage])

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_N8N_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userMessage),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to send message")
      }

      // Remove loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== "loading"))

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        sender: "agent",
        timestamp: new Date(),
        read: isOpen,
      }

      setMessages((prev) => [...prev, agentMessage])
    } catch (err) {
      console.error("Failed to send message to webhook:", err)
      setMessages((prev) => prev.filter((msg) => msg.id !== "loading"))
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Hubo un error",
        sender: "agent",
        timestamp: new Date(),
        read: isOpen,
      }

      setMessages((prev) => [...prev, agentMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Format timestamp to show only hours and minutes
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-lg border bg-background shadow-lg flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between border-b p-3">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Agent" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">Nubihab assistant</p>
                <p className="text-xs text-muted-foreground flex items-center">
                  <span className="rounded-full inline-block bg-green-500 w-[7px] h-[7px] mr-[5px]"></span>
                  <span>Online</span>
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 h-80 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-2 max-w-[85%]", message.sender === "user" ? "ml-auto flex-row-reverse" : "")}
              >
                {message.sender === "agent" && (
                  <Avatar className="h-8 w-8">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center bg-gray-100 text-black border p-[5px]">
                      <User2 />
                    </div>
                  </Avatar>
                )}
                <div>
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <div className="text-sm">
                        <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center bg-gray-900 text-white p-[5px]">
                      <User2 />
                    </div>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-3">
            <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Location</span>
              </Button>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Attach</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Emoji</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Voice</span>
              </Button>
              <Button size="icon" className="h-8 w-8 rounded-full" onClick={sendMessage}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button onClick={toggleChat} className="h-12 w-12 rounded-full shadow-lg" size="icon">
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </>
        )}
        <span className="sr-only">Toggle chat</span>
      </Button>
    </div>
  )
}
