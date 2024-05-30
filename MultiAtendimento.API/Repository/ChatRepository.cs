using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository.BancoDeDados;

namespace MultiAtendimento.API.Repository
{
    public class ChatRepository : BaseRepository<Chat>, IChatRepository
    {
        public ChatRepository(ContextoDoBancoDeDados contextoDoBancoDeDados) : base(contextoDoBancoDeDados)
        {
        }
    }
}
