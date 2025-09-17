import ChatWidget from '../components/ChatWidget';

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center max-w-4xl mx-auto px-6">
        <h1 className="mb-6 text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Chat Assistant
        </h1>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          Experience the future of conversational AI with our modern, feature-rich chatbot interface. 
          Click the chat button to start an intelligent conversation with smart suggestions, voice input, 
          file sharing, and multilingual support.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              🤖
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart AI Responses</h3>
            <p className="text-slate-600 text-sm">Get intelligent, contextual responses powered by advanced AI technology</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              🎤
            </div>
            <h3 className="text-lg font-semibold mb-2">Voice & File Support</h3>
            <p className="text-slate-600 text-sm">Communicate through voice messages and share files effortlessly</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              🌍
            </div>
            <h3 className="text-lg font-semibold mb-2">Multilingual & Responsive</h3>
            <p className="text-slate-600 text-sm">Chat in multiple languages with a beautiful, mobile-optimized interface</p>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <h4 className="text-lg font-semibold mb-2">Try These Features:</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-700 border">Dark/Light Mode</span>
            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-700 border">Quick Replies</span>
            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-700 border">Message Search</span>
            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-700 border">Chat Export</span>
            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-700 border">Voice Recording</span>
            <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-700 border">File Upload</span>
          </div>
        </div>
      </div>
      
      <ChatWidget />
    </div>
  );
};

export default Index;
