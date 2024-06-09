using AutoMapper;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Enums;
using MultiAtendimento.API.Models.Interfaces;

namespace MultiAtendimento.API.Services
{
    public class ChatService
    {
        private readonly IMapper _mapper;
        private readonly IChatRepository _chatRepository;
        public ChatService(IChatRepository chatRepository, IMapper mapper)
        {
            _chatRepository = chatRepository;
            _mapper = mapper;
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

        public void AdicionarMensagem(Mensagem mensagem)
        {
            if (string.IsNullOrWhiteSpace(mensagem.Conteudo))
                return;

            _chatRepository.AdicionarMensagem(mensagem);
        }

        public List<ChatView> ObterChatsDoUsuarioLogado(int idUsuario, int setorId)
        {
            var listaDeChats = _mapper.Map<List<ChatView>>(_chatRepository.ObterChatsDoUsuario(idUsuario, setorId));
            return listaDeChats;
        }
    }
}
