import { useId, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Button } from '@/components/Button';


export function SignUpForm() {
  const [emailAddress, setEmailAddress] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [formStartTime, setFormStartTime] = useState(Date.now());
  const [honeypot, setHoneypot] = useState('');
  const [jsCheckValue, setJsCheckValue] = useState('');
  const [isLinux, setIsLinux] = useState(false);
  let id = useId();

  useEffect(() => {
    setFormStartTime(Date.now());
    setJsCheckValue('passed');
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    const linuxDetected = platform.includes('linux') || userAgent.includes('linux');
    setIsLinux(linuxDetected);
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChangeEmail = (e) => {
    setEmailAddress(e.target.value);
    if (!!e.target.value && !validateEmail(e.target.value)) {
      setErrorText('Invalid Email Address');
    } else {
      setErrorText('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLinux) {
      setErrorText('Access denied. Linux users are restricted.');
      return;
    }
    if (honeypot) {
      setErrorText('Spam detected. Please try again.');
      return;
    }
    const timeElapsed = Date.now() - formStartTime;
    if (timeElapsed < 2000) {
      setErrorText('Form submission too fast. Please try again.');
      return;
    }
    if (jsCheckValue !== 'passed') {
      setErrorText('Spam detected. Please try again.');
      return;
    }
    if (!validateEmail(emailAddress)) {
      setErrorText('Invalid Email Address');
      return;
    }

    const serviceID = 'service_9eddj4w';
    const templateID = 'template_4hdqwxt';
    const userID = 'njnJ53uqzX5AysTcD';

    emailjs
      .send(serviceID, templateID, { emailAddress }, userID)
      .then(() => {
        setIsSent(true);
        setEmailAddress('A representative will contact you.');
      })
      .catch(() => {
        setErrorText('Error Sending Email');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="relative isolate mt-8 flex items-center pr-2">
      {/* Honeypot Field */}
      <input
        type="text"
        name="user_phone_hidden"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        tabIndex="-1"
        autoComplete="off"
      />
      {/* JavaScript Check Hidden Field */}
      <input type="hidden" name="jsCheck" id="jsCheck" value={jsCheckValue} />
      <label htmlFor={id} className="sr-only">
        Email address
      </label>

      {/* Email Input with Always-Visible Ring */}
      <div className="relative sm:static sm:flex-auto">
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="Email Address"
          className="peer relative z-10 w-full appearance-none bg-transparent px-4 py-2 text-base text-white placeholder:text-white/70 focus:outline-none sm:py-3"
          disabled={isSent}
          value={emailAddress}
          onChange={handleChangeEmail}
        />
        <div
          className={`absolute inset-0 rounded-md border ${
            !!errorText ? 'border-red-800' : 'border-white/20'
          } peer-focus:border-white/50 peer-focus:bg-zinc-800 peer-focus:ring-1 peer-focus:ring-white/50 sm:rounded-xl`}
        />
        {!!errorText && (
          <span className="absolute left-4 bottom-[-32px] text-sm text-red-800">
            {errorText}
          </span>
        )}
      </div>

      {/* Matching Red "Get Access" Button */}
      <Button type="submit">
        Learn More
      </Button>

    </form>
  );
}
