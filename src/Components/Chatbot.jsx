import React, { useState, useRef, useEffect } from "react"
import Chatboticon from "./Chatboticon"
import './Chatbot.css';
import ChatForm from "./ChatForm";
import ChatMessage from './ChatMessage'; 
import chatbotayom from '../assets/foto/chatbotayom.png';

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    // Tambahkan segera pesan "Thinking..." dan hapus pesan sebelumnya
    setChatHistory(prevHistory => 
      prevHistory.filter(msg => msg.text !== "Thinking...")
        .concat({ role: "model", text: "Thinking..." })
    );

    const lastMessage = history[history.length - 1]?.text?.toLowerCase();
  
    // Daftar salam dan kata pengantar
    const greetings = [
      "halo", "hai", "hello", "hi", "apa kabar", "apakabar", 
      "halo apa kabar?", "selamat siang", "selamat pagi", "selamat malam"
    ];

    const donationKeywords = [
      "donasi sampah", "form donasi", "cara donasi", "mendaftarkan sampah", 
      "prosedur donasi", "cara sumbang sampah"
    ];

    const dropoffKeywords = [
      "drop off", "antarkan sampah", "lokasi drop off", "tempat drop sampah", 
      "cara antarkan sampah"
    ];

    const volunteerKeywords = [
      "volunteer", "event volunteer", "kegiatan volunteer", "relawan", 
      "bergabung volunteer", "ikut volunteer"
    ];

    const recycleKeywords = [
      "daur ulang", "kerajinan sampah", "proses daur ulang", 
      "pengolahan sampah", "sampah didaur ulang"
    ];


    if (greetings.includes(lastMessage)) {
      setChatHistory((prev) => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: "Halo! Ada yang bisa saya bantu?" }
      ]);
      return;
    }

    if (donationKeywords.some(keyword => lastMessage.includes(keyword))) {
      setChatHistory((prev) => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: "Untuk donasi sampah, Anda bisa menggunakan form donasi yang tersedia di website Ayomi. Kami akan menjemput sampah Anda di lokasi atau Anda bisa melakukan drop off. Silakan lengkapi form dengan detail jenis dan jumlah sampah yang ingin Anda sumbangkan." }
      ]);
      return;
    }

    if (dropoffKeywords.some(keyword => lastMessage.includes(keyword))) {
      setChatHistory((prev) => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: "Ayomi menyediakan layanan drop off sampah. Anda bisa langsung membawa sampah ke lokasi drop off kami. Detail lokasi dan jam operasional bisa Anda cek di website Ayomi. Pastikan sampah sudah dipilah sesuai jenisnya sebelum di-drop off." }
      ]);
      return;
    }

    if (volunteerKeywords.some(keyword => lastMessage.includes(keyword))) {
      setChatHistory((prev) => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: "Ayomi rutin mengadakan kegiatan volunteer untuk pengolahan sampah dan edukasi lingkungan. Anda bisa mendaftar menjadi volunteer melalui form yang tersedia di website kami. Kami selalu membutuhkan relawan yang peduli terhadap lingkungan dan ingin berkontribusi dalam daur ulang sampah." }
      ]);
      return;
    }

    // Respons untuk daur ulang
    if (recycleKeywords.some(keyword => lastMessage.includes(keyword))) {
      setChatHistory((prev) => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: "Di Ayomi, kami mengolah berbagai jenis sampah menjadi kerajinan bernilai guna. Sampah yang Anda donasikan akan kami proses melalui tahapan daur ulang yang tepat. Hasilnya bisa berupa kerajinan, produk daur ulang, atau bahan baku untuk produk lainnya." }
      ]);
      return;
    }

    // Filter untuk memastikan pertanyaan terkait sampah
    const isRelevant = [
      "sampah", 
      "pengelolaan sampah", 
      "kerajinan sampah", 
      "jenis sampah", 
      "daur ulang", 
      "recycle"
    ].some(keyword => lastMessage.includes(keyword));
  
    if (!isRelevant) {
      setChatHistory((prev) => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: "Maaf, silakan tanyakan hal yang terkait Ayomi." }
      ]);
      return;
    }
  
    // Format chat history for API request
    const formattedHistory = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };
  
    try {
      // Make the API call to get the bot's response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");
  
      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      // Perbarui riwayat chat dengan menghapus "Thinking..." dan menambahkan respons
      setChatHistory(prevHistory => 
        prevHistory
          .filter(msg => msg.text !== "Thinking...")
          .concat({ role: "model", text: apiResponseText })
      );
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text: "Maaf, terjadi kesalahan. Silakan coba lagi." }
      ]);
    }
  };
  
  useEffect(() => {
    // auto scroll whenever chat history updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight, 
        behavior: "smooth"
      });
    }
  }, [chatHistory]);  

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)}
       id="chatbot-toggler">
        <span className="material-symbols-rounded">
          mode_comment
        </span>

        <span className="material-symbols-rounded">
          close
        </span>
      </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon/>
            <img src={chatbotayom} alt="Chatbot Logo" className="chatbot-logo" />
            <h2 className="logo-text">Chatbot</h2>
          </div>
            <button onClick={() => setShowChatbot((prev) => !prev)}
             className="material-symbols-rounded"> keyboard_arrow_down
            </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <Chatboticon/>
            <p className="message-text">
              Halo, ada yang bisa saya bantu?
            </p>
          </div>

          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        
        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  )
}

export default Chatbot