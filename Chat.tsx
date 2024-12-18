
'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import Input from './Input'
import { ChartConfig, Message } from './types';
import { selectedEntityIdState } from '../../../../launchads/store/launchAdrecoil'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  buttonVisibilityAtoms,
  inputAtom,
  disableChatInputAtom,
  isConnectedAtom,
  hidePlaceholderAtom,
} from '../../../../launchads/store/launchAdrecoil'
import UserMessageComponent from '../../../../launchads/components/chat/UserMessage'
import SageLlmResponse from './SageLlmResponse'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { activeAccountAtom } from '@/store/activeAdAccount';
import DataFrame from './DataFrame'
import ChartDisplay from './ChartDisplay';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://13.126.104.109:8002/query';
type ChartType = 'bar' | 'line' | 'scatter' | 'bubble' | 'heatmap' | 'funnel' | 'stackedBar';

const Chat = () => {
  const [input, setInput] = useRecoilState(inputAtom)
const activeAdAccount=useRecoilValue(activeAccountAtom)
const [savedCharts, setSavedCharts] = useState<ChartConfig[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const entity_id = useRecoilValue(selectedEntityIdState)
  const [messages, setMessages] = useState<Message[]>([{
      id: Date.now(),
      role: "aiResponse",
      content: "Hello! I'm Sage, here to help you visualize your data. what do you wish to visualize?",
      chartConfigs: [],
      loading: false, // Add loading property
    }])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  useEffect(() => {
	const newSessionId = uuidv4(); // Generate a new session ID
	setSessionId(newSessionId);     // Set it in the state
	console.log('New session ID generated:', newSessionId);
      }, []);
console.log("sessionId", sessionId)

  const setDisable = useSetRecoilState(disableChatInputAtom)
  const [hidePlaceholder, setHidePlaceholder] = useRecoilState(
    hidePlaceholderAtom,
  )
  const [isConnected, setIsConnected] = useRecoilState(isConnectedAtom)
  const [buttonVisibility, setButtonVisibility] = useRecoilState(
    buttonVisibilityAtoms,
  )

  useEffect(() => {
	setIsConnected(true);
  }, [])
  	
      const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
	e.preventDefault();
	if (!input.trim()) return;
    
	setRetryCount(0);
	setIsLoading(true);
    
	const userMessage: Message = {
	  id: Date.now(),
	  role: 'userResponse',
	  content: input,
	  timeOfMessage: format(new Date(), 'HH:mm'),
	};
    
	const loadingBotMessage: Message = {
	  id: Date.now() + 1,
	  role: 'aiResponse',
	  content: '',
	  loading: true,
	  timeOfMessage: format(new Date(), 'HH:mm'),
	};
    
	setMessages((prev) => [...prev, userMessage, loadingBotMessage]);
	setInput(''); // Clear the input field
    
		  try {
			  const entity_type = entity_id ? "campaign" : "ad_account"; 
	  const output = await axios.post(API_URL, {
	    query_str: input,
	    entity_type: entity_type,
	    entity_id: entity_id || activeAdAccount.id,
	    session_id: sessionId
	  }, {
	    headers: {
	      'Content-Type': 'application/json',
	    }
	  });
    
	  const data = output.data;
	  const pandasOutput = data.pandas_output;
	  const response: string = data.response || '';
    
	  let chartConfigs: ChartConfig[] = [];
	  if (pandasOutput) {
	    try {
	      const pandas = JSON.parse(pandasOutput);
	      if (pandas.visualizations && pandas.visualizations.length > 0) {
		chartConfigs = pandas.visualizations.map((viz: any) => ({
		  desc: viz.desc || 'Chart description',
		  title: viz.title || 'Chart title',
		  chart_type: viz.chart_type as ChartType,
		  data: JSON.parse(viz.parsed),
		  x_field: viz.fields[0],
		  y_field: viz.fields[1],
		  x_label: viz.x_label || viz.x_field,
		  y_label: viz.y_label || viz.y_field,
		}));
	      }
	    } catch (chartError) {
	      console.error('Error generating chart:', chartError);
	    }
	  }
    
	  setMessages((prev) => {
	    const updatedMessages = prev.filter(msg => msg.id !== loadingBotMessage.id);
	    return [
	      ...updatedMessages,
	      {
		id: Date.now() + 2,
		role: 'aiResponse',
		content: response || 'Sage -',
		chartConfigs: chartConfigs.length > 0 ? chartConfigs : undefined,
		timeOfMessage: format(new Date(), 'HH:mm'),
	      },
	    ];
	  });
    
	} catch (error) {
	  console.error('Error generating response:', error);
	  const errorMessage = axios.isAxiosError(error)
	    ? error.response?.data?.message || error.message
	    : 'Didnt quite catch that. Please try again later.';
    
	  if (retryCount < 2) {
	    setRetryCount((prev) => prev + 1);
	    console.log(`Retrying... attempt ${retryCount + 1}`);
	    await handleFormSubmit(e);
	  } else {
	    setMessages((prev) => {
	      const updatedMessages = prev.filter(msg => msg.id !== loadingBotMessage.id);
	      return [
		...updatedMessages,
		{
		  id: Date.now() + 2,
		  role: 'aiResponse',
		  content: errorMessage,
		  timeOfMessage: format(new Date(), 'HH:mm'),
		},
	      ];
	    });
	  }
	} finally {
	  setIsLoading(false);
	}
      }, [input, retryCount, activeAdAccount.id, sessionId]);

  return (
    <div className="flex flex-col relative max-h-[84dvh] bg-white dark:bg-transparent">
      {/* Fixed Header */}

      {/* Scrollable Message Area */}
      <main className="flex-1  min-h-[calc(100vh-10rem)] overflow-y-auto p-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-10">
        {messages.map((m, index) => (
          <div key={index} className="mb-4 ">
            {m.role === 'userResponse' && (
              <div className="mx-6 flex justify-end">
                <UserMessageComponent key={index} userMessage={m.content} />
              </div>
            )}
            {m.role === 'aiResponse' && (
              <SageLlmResponse
	      	key={index} 
                message={m}
                isLoading={m.loading || false}
                answerTime={m.timeOfMessage || ''}
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
	<div className='absolute right-0 top-80'>
	<DataFrame />
	
      </div>
      <div className='absolute right-0 top-96'>
      <ChartDisplay />
      </div>
	
      </main>

      {/* Fixed Footer */}
      <footer className="sticky bottom-0   bg-white dark:bg-transparent">
        <Input handleFormSubmit={handleFormSubmit} />
      </footer>
     
    </div>
  )
}

export default Chat
