"use client"
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ContactClient = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.subject || !form.message) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      toast.success('Message sent successfully!');
      setForm({ name: '', contact: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-100 via-white to-blue-100 py-20 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/mic-bg.jpg')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 drop-shadow">
            Contact <span className="text-purple-700">Us</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 md:py-4 md:px-20">
        <div className="max-w-3xl mx-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Phone or Email</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Phone number or email"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Short subject"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write your message here"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-8 py-3 rounded-full shadow hover:from-blue-700 hover:to-purple-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactClient;