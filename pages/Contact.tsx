import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      console.log('Form Submitted:', data);
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Vamos Trabalhar Juntos?</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Tem um projeto em mente ou quer escalar a qualidade do seu conteúdo? 
          Preencha o formulário abaixo e entrarei em contato.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <Mail className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-slate-400 mb-4">Para orçamentos detalhados e parcerias.</p>
              <a href="mailto:igorcamposvs@gmail.com" className="text-accent hover:underline font-medium">igorcamposvs@gmail.com</a>
           </div>

           <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Disponibilidade</h3>
              <p className="text-slate-400">
                Atualmente aceitando projetos para:<br/>
                <span className="text-slate-200 mt-2 block">• Edição de Vídeo (YouTube/Reels)</span>
                <span className="text-slate-200 block">• Identidade Visual & Flyers</span>
                <span className="text-slate-200 block">• Web Design</span>
                <span className="text-slate-200 block">• Cobertura de Eventos</span>
                <span className="text-slate-200 block">• Tratamento de Imagem</span>
                <span className="text-slate-200 block">• Serviços Freelance</span>
              </p>
           </div>
        </div>

        {/* Form */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-secondary p-8 rounded-2xl border border-slate-700 shadow-xl"
        >
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
              <p className="text-slate-400">Obrigado pelo contato. Responderei em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
                <input 
                  {...register('name', { required: 'Nome é obrigatório' })}
                  className={`w-full px-4 py-3 bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all`}
                  placeholder="Seu nome"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input 
                  {...register('email', { 
                    required: 'Email é obrigatório',
                    pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
                  })}
                  className={`w-full px-4 py-3 bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all`}
                  placeholder="seu@email.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Mensagem</label>
                <textarea 
                  {...register('message', { required: 'Mensagem é obrigatória', minLength: { value: 20, message: 'Mínimo de 20 caracteres' } })}
                  rows={4}
                  className={`w-full px-4 py-3 bg-slate-900 border ${errors.message ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none`}
                  placeholder="Descreva seu projeto..."
                />
                {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center py-3 bg-accent hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  <>Enviar Mensagem <Send className="ml-2 w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;