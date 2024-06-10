using MultiAtendimento.API.Models;
using Microsoft.EntityFrameworkCore;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository.BancoDeDados;
using MultiAtendimento.API.Models.Enums;

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

        public List<Chat> ObterChatsDoUsuario(int idUsuario, int setorId, CargoEnum cargoEnum)
        {
            var chatsPorUsuario = _dbSet
                        .Include(c => c.Mensagens)
                        .Include(c => c.Cliente)
                        .Where(c => cargoEnum == CargoEnum.ADMIN
                                 || ((c.AtendenteId == null && c.Status == StatusDoChatEnum.Nenhum)
                                 || (c.AtendenteId == idUsuario && c.Status == StatusDoChatEnum.Atendido && c.SetorId == setorId)));

            return chatsPorUsuario.ToList();
        }
    }
}