using AutoMapper;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;

namespace MultiAtendimento.API.Services
{
    public class MapperService : Profile
    {
        public MapperService() 
        {
            CreateMap<SetorInput, Setor>();

            CreateMap<ClienteInput, Cliente>();

            CreateMap<UsuarioInput, Usuario>();

            CreateMap<AtualizarUsuarioInput, Usuario>();
            
            CreateMap<Chat, ChatView>();

            CreateMap<Mensagem, MensagemView>();

            CreateMap<Cliente, ClienteView>();
        }
    }
}