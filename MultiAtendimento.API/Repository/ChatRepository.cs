using MultiAtendimento.API.Models;
using Microsoft.EntityFrameworkCore;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository.BancoDeDados;

namespace MultiAtendimento.API.Repository
{
    public class ChatRepository : BaseRepository<Chat>, IChatRepository
    {
        private readonly IMensagemRepository _mensagemRepository;
        public ChatRepository(ContextoDoBancoDeDados contextoDoBancoDeDados, IMensagemRepository mensagemRepository) : base(contextoDoBancoDeDados)
        {
            _mensagemRepository = mensagemRepository;
        }

        public void AdicionarMensagem(Mensagem mensagem)
        {
            _mensagemRepository.Criar(mensagem);
            _contextoDoBancoDeDados.SaveChanges();
        }

        public List<Chat> ObterChatsDoUsuario(int idUsuario, int setorId)
        {
            return _dbSet
                        .Include(c => c.Mensagens)
                        .Include(c => c.Cliente)
                        .Where(c => (c.AtendenteId == idUsuario || c.AtendenteId == null) && c.SetorId == setorId)
                        .ToList();
        }
    }
}