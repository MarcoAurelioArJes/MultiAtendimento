using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.Enums;
using MultiAtendimento.API.Models.Interfaces;

namespace MultiAtendimento.API.Services
{
    public class ChatService
    {
        private readonly IChatRepository _chatRepository;
        public ChatService(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public Chat Criar(Cliente cliente)
        {
            var chat = new Chat
            {
                Atendente = null,
                Setor = cliente.Setor,
                Cliente = cliente,
                Status = StatusDoChatEnum.Nenhum,
                Empresa = cliente.Empresa
            };

            _chatRepository.Criar(chat);
            return chat;
        }
    }
}
