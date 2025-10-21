import emailjs from '@emailjs/browser';

export const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  if (!publicKey) {
    console.error('EmailJS public key not found. Please check your .env file.');
    return false;
  }
  
  emailjs.init(publicKey);
  return true;
};

export const sendContactEmail = async (formData) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  
  if (!serviceId || !templateId) {
    throw new Error('EmailJS configuration incomplete. Please check your .env file.');
  }

  const templateParams = {
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    company: formData.company,
    message: formData.message,
    to_name: 'Alaq Solutions Team',
    reply_to: formData.email,
  };

  const result = await emailjs.send(serviceId, templateId, templateParams);
  return result;
};

export const validateEmailJSConfig = () => {
  const requiredVars = [
    'VITE_EMAILJS_PUBLIC_KEY',
    'VITE_EMAILJS_SERVICE_ID', 
    'VITE_EMAILJS_TEMPLATE_ID'
  ];
  
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing EmailJS environment variables:', missing);
    return false;
  }
  
  return true;
};