import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Lock, UploadCloud, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Admin: React.FC = () => {
  const { isAdminMode, toggleAdminMode } = useStore();
  const [password, setPassword] = useState('');
  const { register, handleSubmit, reset } = useForm();
  const [projects, setProjects] = useState<any[]>([]); // Local state for demo

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Mock password
      toggleAdminMode();
    } else {
      alert('Senha incorreta (use admin123)');
    }
  };

  const handleAddProject = (data: any) => {
    const newProject = {
      ...data,
      id: Math.random().toString(),
      thumbnail: 'https://picsum.photos/800/600', // Mock upload
      date: new Date().toISOString().slice(0, 7)
    };
    setProjects([newProject, ...projects]);
    reset();
    alert('Projeto adicionado (simulado)');
  };

  if (!isAdminMode) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-slate-900 rounded-full">
              <Lock className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h2 className="text-2xl text-center text-white font-bold mb-6">Acesso Administrativo</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha (admin123)"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-accent"
            />
            <button className="w-full py-3 bg-accent text-slate-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
         <h1 className="text-3xl font-bold text-white">Gerenciar Projetos</h1>
         <button onClick={toggleAdminMode} className="text-slate-400 hover:text-white">Sair</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-accent" /> Novo Projeto
            </h3>
            <form onSubmit={handleSubmit(handleAddProject)} className="space-y-4">
               <div>
                 <label className="text-slate-400 text-sm">Título</label>
                 <input {...register('title', {required: true})} className="w-full mt-1 px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white" />
               </div>
               <div>
                 <label className="text-slate-400 text-sm">Categoria</label>
                 <select {...register('category')} className="w-full mt-1 px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white">
                   <option value="video">Vídeo</option>
                   <option value="design">Design</option>
                   <option value="web">Web</option>
                 </select>
               </div>
               <div>
                 <label className="text-slate-400 text-sm">Descrição</label>
                 <textarea {...register('description')} className="w-full mt-1 px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white" rows={3}></textarea>
               </div>
               
               <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:border-accent hover:text-accent transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <span className="text-sm">Upload de Thumbnail</span>
                  <input type="file" className="hidden" />
               </div>

               <button className="w-full py-2 bg-accent text-slate-900 font-bold rounded hover:bg-cyan-400">
                 Publicar
               </button>
            </form>
          </div>
        </div>

        {/* List (Demo) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <p className="text-slate-400 text-sm">Aqui você veria a lista de projetos do Supabase/Firebase. Esta é uma demonstração de UI.</p>
          </div>
          {projects.map((p) => (
            <div key={p.id} className="flex gap-4 p-4 bg-slate-800 rounded-lg items-center animate-in fade-in slide-in-from-top-4">
               <div className="w-16 h-16 bg-slate-700 rounded overflow-hidden">
                 <img src={p.thumbnail} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1">
                 <h4 className="text-white font-bold">{p.title}</h4>
                 <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{p.category}</span>
               </div>
               <button className="text-red-400 hover:text-red-300 text-sm">Remover</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
