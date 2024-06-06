using Microsoft.EntityFrameworkCore;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.Enums;
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

        public List<Chat> ObterChatsDoUsuario(int idUsuario)
        {
            return _dbSet
                        .Include(c => c.Mensagens)
                        .Where(c => c.AtendenteId == idUsuario || c.Status == StatusDoChatEnum.Nenhum)
                        .ToList();
        }
    }
}
