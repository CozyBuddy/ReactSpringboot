import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import { useEffect, useRef, useState } from "react";
import { sendmail } from './../api/sendMail';
import { useRecoilState } from "recoil";
import signinState from "../atoms/signinState";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GetGeminiChat} from "../api/geminiApi";
import loading from '../image/duckloading.gif'
const MainPage = () => {
    const emailData = {
        email: '',
    };
    const [prompt , setPrompt] = useState('')
    const [email, setEmail] = useState({ ...emailData });
    const [isvalid, setValid] = useState(false);
    const [login , setlogin] = useState(false);
    const [loginState, setLoginState] = useRecoilState(signinState);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null); // 메시지 끝에 대한 ref

    const setText = (e) => {
      setPrompt(e.target.value)
    }
    const handleSend = async() => {
      if(prompt == '') return 
      setMessages((prevMessage) =>[
        ...prevMessage ,
        { sender: 'user', text: prompt }
       ])
       setPrompt('')
       setMessages((prevMessage) =>[
        ...prevMessage ,
        { sender: 'Gemini', text: <img src={loading} alt="" className="h-32 w-20 bg-white"/> }
       ])
       const result = await GetGeminiChat(prompt,loginState.email)
    

       setMessages((prevMessage) =>[
        ...prevMessage.slice(0, prevMessage.length - 1),
        { sender: 'Gemini', text: result }
       ])

       

    };
    useEffect(() => {
      console.log(loginState)
      console.log(loginState.email)
      if(loginState.email == ''){
        setlogin(false)
      } else {
        setlogin(true)
      }
    }, [loginState])
    const insertemail = (e) => {
        setEmail({ ...email, email: e.target.value });
        const value = e.target.value;
        const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValid(regex.test(value))
    };
    // emailData가 변경될 때만 email을 업데이트
    const keyEnter = (e) => {
      if(e.key =='Enter'){
        handleSend()
      }
    }
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages]); // messages가 변경될 때마다 실행
    const sendMail = async() => {

     
      if (isvalid){
        const res = await sendmail(email);
        console.log(res)
        alert(res)
      } else {
        alert("정확한 이메일 주소를 입력해주세요")
      }
      
    };


    return (
        <BasicLayout>
              <div className=" text-white flex justify-center items-center  h-[100%]">
     {login ==false ? (
      <div className="bg-white bg-opacity-80 mt-14 md:mt-0 p-10 rounded-lg shadow-2xl w-full sm:w-96 h-[80%]" >
       <h1 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-6">
          🎶 구글 Gemini 챗봇 대화하기 🎤
        </h1>

        <p className="text-xs md:text-lg text-gray-900 mb-6">
          회원가입하고 로그인하시면 구글 Gemini 챗봇을 이용할 수 있습니다. <br />
         <div className="text-red-500">주의사항! 채팅된 내용은 향후 서비스 개선 목적으로 사용될 수 있으니 주의가 필요합니다.</div> <br />
        </p>
        <p className="text-xs md:text-lg text-gray-900 mb-6">
          현재 단순한 대화만 가능합니다. <br />
          추후에 지속적인 업데이트로 부가 기능을 추가할 예정입니다. <br />
        </p>
        {/* <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-6">
          🎶 인공지능으로 가수의 목소리로 노래를 부르다 🎤
        </h1>
        <p className="text-lg text-gray-900 mb-6">
          혁신적인 생성형 AI 기술을 활용하여, 좋아하는 노래를 원하는 가수의 목소리로 들을 수 있는 기회!
          <br />
          AI가 여러분의 음악 경험을 새롭게 정의합니다.
        </p>
        <p className="text-md text-gray-700 mb-8">
          곧 출시될 저희의 새로운 서비스, 나만의 가수와 함께하는 음악의 세계로 초대합니다.
        </p>
        
        <form className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
            이메일을 입력하고 알림을 받아보세요!
          </label>
          <input
            type="email"
            id="email"
            onChange={insertemail}
            placeholder="이메일 입력"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-800"
          />
          <button
            onClick={sendMail}
            type="button"
            className="w-full p-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg hover:bg-gradient-to-l from-teal-500 to-green-400 transition duration-300"
          >
            출시 알림 받기
          </button>
        </form> */}
      </div>
 ) :  

<div className="border-2 border-sky-200 mt-5 m-2 p-4 h-full w-full md:w-[80%] overflow-y-auto">
<div className="flex justify-center h-full w-full md:w-[80%]">
<div className="flex flex-col items-center justify-center bg-blue-50 w-full md:w-full h-full">
 <div className="flex flex-col bg-white shadow-lg border border-gray-600 rounded-lg p-4 md:mt-2 ml-0 md:ml-96 h-full w-full md:w-[100%]">
   {/* Header */}
   <div className="text-center font-bold text-lg text-blue-600 mb-0 h-[5%] w-full" >
     AI와 채팅하기 💬
   </div>

   {/* Chat Messages */}
   <div className="overflow-auto flex flex-col space-y-2 mb-4 w-full h-full ">
     {messages.map((msg, index) => (
       <div
         key={index}
         className={`${
           msg.sender === "user" ? "self-end bg-blue-700" : "self-start bg-gray-700"
         } max-w-[70%] p-2 rounded-lg text-sm`}
       >
         {msg.text}
       </div>
     ))}
     <div ref={messagesEndRef}/>
   </div>

   {/* Input Area */}
   <div className="flex items-center space-x-2 mt-2 w-[95%] h-12">
     <input
       type="text"
       className="flex-grow p-2 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400 w-full "
       placeholder="대화를 입력해보세요."
       value={prompt}
       onInput={setText}
       onKeyDown={keyEnter}
     />
     <button
       className="bg-blue-500 text-white md:text-xl text-xs md:px-3 w-auto px-1 py-2 rounded-lg hover:bg-blue-600"
       onClick={handleSend}
     >
       보내기
     </button>
   </div>
 </div>

</div> 
</div>
</div>}
      {/* <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">🎧 서비스 기능 미리보기</h2>
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </div>
            <p className="text-lg mt-4 text-gray-100">다양한 가수 목소리</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-6 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p className="text-lg mt-4 text-gray-100">가수 선택 기능</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <p className="text-lg mt-4 text-gray-100">간편한 사용법</p>
          </div>
        </div>
      </div> */}
    </div>
 
        </BasicLayout>
    )
}

export default MainPage;