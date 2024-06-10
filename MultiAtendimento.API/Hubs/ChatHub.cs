using Microsoft.AspNetCore.SignalR;
using MultiAtendimento.API.Services;
using MultiAtendimento.API.Repository;
using MultiAtendimento.API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using MultiAtendimento.API.Models;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using System;

namespace MultiAtendimento.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ListaDeChatsTemporaria _listaDeChatsTemporaria;
        private readonly UsuarioService _usuarioService;
        private readonly ClienteService _clienteService;
        private readonly ChatService _chatService;
        private readonly SetorService _setorService;
        private readonly IMapper _mapper;

        public ChatHub(ListaDeChatsTemporaria listaDeChatsTemporaria, ClienteService clienteService, ChatService chatService, SetorService setorService, IMapper mapper, UsuarioService usuarioService)
        {
            _listaDeChatsTemporaria = listaDeChatsTemporaria;
            _clienteService = clienteService;
            _chatService = chatService;
            _setorService = setorService;
            _mapper = mapper;
            _usuarioService = usuarioService;
        }

        public async Task IniciarChat(ClienteInput clienteInput)
        {
            try
            {
                var clienteCriado = _clienteService.Criar(clienteInput);

                var chat = _chatService.Criar(clienteCriado);

                await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());

                //TO DO REMOVER _listaDeChatsTemporaria
                //_listaDeChatsTemporaria.Chats[Context.ConnectionId] = chat;

                var token = TokenService.ObterTokenDoClientePorChat(chat);
                await Clients.Caller.SendAsync("TokenDoCliente", token);

                await Clients.OthersInGroup($"{chat.Setor.Empresa.Cnpj}_{chat.Setor.Nome.Replace(" ", "")}").SendAsync("ChatCriado", chat);
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("EventoDeErro", "Erro ao iniciar o chat tente novamente");
            }
        }

        public async Task EnviarMensagemCliente(EnviarMensagemClienteInput enviarMensagemClienteInput)
        {
            try
            {
                var securityToken = TokenService.ObterTokenValido(enviarMensagemClienteInput.Token);

                var empresaCnpj = securityToken.Claims.FirstOrDefault(c => c.Type.Equals("empresaCnpj")).Value;
                var chatId = securityToken.Claims.FirstOrDefault(c => c.Type.Equals("chatId")).Value;

                int chatIdInt = int.Parse(chatId);
                var mensagem = new Mensagem
                {
                    ChatId = chatIdInt,
                    Conteudo = enviarMensagemClienteInput.Conteudo,
                    EmpresaCnpj = empresaCnpj
                };

                _chatService.AdicionarMensagem(mensagem);

                var chat = _chatService.ObteChatPorId(chatIdInt);

                var mensagemView = _mapper.Map<MensagemView>(mensagem);

                if (chat.AtendenteId is null)
                    await Clients.OthersInGroup($"{chat.Setor.Empresa.Cnpj}_{chat.Setor.Nome.Replace(" ", "")}").SendAsync("MensagemRecebida", chat);
                else 
                    await Clients.OthersInGroup(chatId).SendAsync("MensagemRecebida", mensagemView);
                
                await Clients.Caller.SendAsync("MensagemAtualEnviada", mensagemView);
            }
            catch (SecurityTokenException exception)
            {
                await Clients.Caller.SendAsync("EventoDeErro", exception.Message);
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("EventoDeErro", "Chat expirado necessário criar um novo");
            }
        }

        [Authorize]
        public async Task EnviarMensagem(EnviarMensagemInput enviarMensagemInput)
        {
            var empresaCnpj = Context.User.Claims.FirstOrDefault(c => c.Type.Equals("empresaCnpj")).Value;

            var mensagem = new Mensagem
            {
                ChatId = enviarMensagemInput.ChatId,
                Conteudo = enviarMensagemInput.Conteudo,
                EmpresaCnpj = empresaCnpj
            };

            _chatService.AdicionarMensagem(mensagem);

            var mensagemView = _mapper.Map<MensagemView>(mensagem);

            await Clients.OthersInGroup(enviarMensagemInput.ChatId.ToString()).SendAsync("MensagemRecebida", mensagemView);
            await Clients.Caller.SendAsync("MensagemAtualEnviada", mensagemView);
        }

        [Authorize]
        public async Task VincularAUmGrupoDeChats()
        {
            var empresaCnpj = Context.User.Claims.FirstOrDefault(c => c.Type.Equals("empresaCnpj")).Value;
            var setorId = Context.User.Claims.FirstOrDefault(c => c.Type.Equals("setorId")).Value;

            var setor = _setorService.ObterPorId(int.Parse(setorId));

            await Groups.AddToGroupAsync(Context.ConnectionId, $"{empresaCnpj}_{setor.Nome.Replace(" ", "")}");
        }

        [Authorize]
        public async Task VincularAUmChat(int chatId)
        {
            var usuarioId = Context.User.Claims.FirstOrDefault(c => c.Type.Equals("id")).Value;
            var atendenteId = int.Parse(usuarioId);
            var atendente = _usuarioService.ObterPorId(atendenteId);

            _chatService.AdicionarAtendente(chatId, atendente.Id);
            
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
            await Clients.OthersInGroup(chatId.ToString()).SendAsync("VinculadoAoChat", $"Atendente {atendente.Nome} entrou no chat");
        }
    }
}
